package com.company.estoque.dto;

import java.math.BigDecimal;

public record ProductionPlanDTO(String productName, Integer quantity, BigDecimal totalValue) {
}
