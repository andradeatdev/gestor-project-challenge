package com.company.estoque.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.company.estoque.dto.ProductionPlanDTO;
import com.company.estoque.entity.Product;
import com.company.estoque.entity.ProductRawMaterial;
import com.company.estoque.entity.RawMaterial;
import com.company.estoque.repository.ProductRepository;
import com.company.estoque.repository.RawMaterialRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class StockCalculationService {

    @Inject
    ProductRepository productRepository;

    @Inject
    RawMaterialRepository rawMaterialRepository;

    @Transactional
    public List<ProductionPlanDTO> calculateProductionStock() {
        List<Product> products = productRepository.listAll();
        List<RawMaterial> rawMaterials = rawMaterialRepository.listAll();

        Map<Long, Double> virtualStock = rawMaterials.stream()
                .collect(Collectors.toMap(RawMaterial::getId, RawMaterial::getStockQuantity));

        products.sort(Comparator.comparing(Product::getValue).reversed());

        List<ProductionPlanDTO> plan = new ArrayList<>();

        for (Product product : products) {
            if (product.getRawMaterials() == null || product.getRawMaterials().isEmpty()) {
                continue;
            }

            int maxUnits = calculateMaxUnits(product, virtualStock);

            if (maxUnits > 0) {
                BigDecimal totalValue = product.getValue().multiply(BigDecimal.valueOf(maxUnits));
                plan.add(new ProductionPlanDTO(product.getName(), maxUnits, totalValue));

                deductFromStock(product, maxUnits, virtualStock);
            }
        }

        return plan;
    }

    @Transactional
    public int calculateMaxUnitByProduct(Long productId) {
        Product product = productRepository.findByIdOptional(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Map<Long, Double> currentStock = rawMaterialRepository.listAll().stream()
                .collect(Collectors.toMap(RawMaterial::getId, RawMaterial::getStockQuantity));

        return calculateMaxUnits(product, currentStock);
    }

    private int calculateMaxUnits(Product product, Map<Long, Double> currentStock) {
        int maxPossible = Integer.MAX_VALUE;

        for (ProductRawMaterial recipeItem : product.getRawMaterials()) {
            Long rawMaterialId = recipeItem.getRawMaterial().getId();
            Double requirePerUnit = recipeItem.getQuantity();

            Double available = currentStock.getOrDefault(rawMaterialId, 0.0);

            if (requirePerUnit > 0) {
                int possibleForIngredient = (int) (available / requirePerUnit);
                maxPossible = Math.min(maxPossible, possibleForIngredient);
            }
        }

        return (maxPossible == Integer.MAX_VALUE) ? 0 : maxPossible;
    }

    private void deductFromStock(Product product, int quantityProduced, Map<Long, Double> stockToUpdate) {
        for (ProductRawMaterial recipeItem : product.getRawMaterials()) {
            Long rawMaterialId = recipeItem.getRawMaterial().getId();
            Double totalConsumed = recipeItem.getQuantity() * quantityProduced;

            Double current = stockToUpdate.get(rawMaterialId);
            stockToUpdate.put(rawMaterialId, current - totalConsumed);
        }
    }
}
