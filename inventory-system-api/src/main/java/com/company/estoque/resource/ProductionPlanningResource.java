package com.company.estoque.resource;

import java.util.List;

import com.company.estoque.dto.ProductionPlanDTO;
import com.company.estoque.service.StockCalculationService;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/planning")
@Produces(MediaType.APPLICATION_JSON)
public class ProductionPlanningResource {

    @Inject
    StockCalculationService stockCalculationService;

    @GET
    public Response getProductionPlan() {
        List<ProductionPlanDTO> plan = stockCalculationService.calculateProductionStock();
        return Response.ok(plan).build();
    }

}
