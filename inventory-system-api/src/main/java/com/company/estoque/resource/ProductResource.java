package com.company.estoque.resource;

import java.net.URI;
import java.util.List;
import java.util.Map;

import com.company.estoque.dto.RawMaterialAssociationDTO;
import com.company.estoque.entity.Product;
import com.company.estoque.entity.ProductRawMaterial;
import com.company.estoque.entity.RawMaterial;
import com.company.estoque.repository.ProductRepository;
import com.company.estoque.repository.RawMaterialRepository;
import com.company.estoque.service.StockCalculationService;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @Inject
    ProductRepository productRepository;

    @Inject
    RawMaterialRepository rawMaterialRepository;

    @Inject
    StockCalculationService stockCalculationService;

    @GET
    public List<Product> listAll() {
        return productRepository.listAll();
    }

    @GET
    @Path("/{id}")
    public Product findById(@PathParam("id") Long id) {
        return productRepository.findByIdOptional(id).orElseThrow(() -> new NotFoundException("Product not found"));
    }

    @POST
    @Transactional
    public Response create(Product product) {
        productRepository.persist(product);
        return Response.created(URI.create("/products/" + product.getId())).entity(product).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Product update(Product product) {
        Product entity = productRepository.findByIdOptional(product.getId())
                .orElseThrow(() -> new NotFoundException("Product not found"));

        entity.setCode(product.getCode());
        entity.setName(product.getName());
        entity.setValue(product.getValue());

        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = productRepository.deleteById(id);
        return deleted ? Response.noContent().build() : Response.status(Response.Status.NOT_FOUND).build();
    }

    @POST
    @Path("/{id}/raw-materials")
    @Transactional
    public Response addRawMaterial(@PathParam("id") Long id, RawMaterialAssociationDTO dto) {
        Product product = productRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Product not found"));

        RawMaterial rawMaterial = rawMaterialRepository.findByIdOptional(dto.rawMaterialId())
                .orElseThrow(() -> new NotFoundException("RawMaterial not found"));

        ProductRawMaterial association = new ProductRawMaterial();
        association.setProduct(product);
        association.setRawMaterial(rawMaterial);
        association.setQuantity(dto.quantity());

        product.getRawMaterials().add(association);
        productRepository.persist(product);

        return Response.status(Response.Status.CREATED).entity(association).build();
    }

    @POST
    @Path("/{id}/raw-materials/{rawMaterialId}")
    @Transactional
    public Response updateRawMaterialQuantity(@PathParam("id") Long id,
            @PathParam("rawMaterialId") Long rawMaterialId, Map<String, Double> body) {
        Product product = productRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Product not found"));

        ProductRawMaterial association = product.getRawMaterials()
                .stream()
                .filter(a -> a.getRawMaterial().getId().equals(rawMaterialId))
                .findFirst()
                .orElse(null);

        if (association == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Double quantity = body.get("quantity");

        association.setQuantity(quantity);
        return Response.noContent().build();
    }

    @DELETE
    @Path("/{id}/raw-materials/{rawMaterialId}")
    @Transactional
    public Response removeRawMaterial(@PathParam("id") Long id, @PathParam("rawMaterialId") Long rawMaterialId) {
        Product product = productRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Product not found"));

        boolean deleted = product.getRawMaterials()
                .removeIf(association -> association.getRawMaterial().getId().equals(rawMaterialId));

        return deleted ? Response.noContent().build() : Response.status(Response.Status.NOT_FOUND).build();
    }

    @GET
    @Path("/{id}/max-units")
    public Response getMaxUnitsByProduct(@PathParam("id") Long productId) {
        int maxUnits = stockCalculationService.calculateMaxUnitByProduct(productId);
        return Response.ok(Map.of("productId", productId, "maxUnits", maxUnits)).build();
    }
}
