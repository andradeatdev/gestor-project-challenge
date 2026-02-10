package com.company.estoque;

import static io.restassured.RestAssured.given;

import java.util.Map;

import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;

@QuarkusTest
public class ProductionFlowIT {

    @Test
    void testFullProductionScenario() {
        Integer rawMaterialId = given()
                .contentType(ContentType.JSON)
                .body(Map.of(
                        "code", "RM-TEST-01",
                        "name", "Woord",
                        "quantity", 100.0))
                .when()
                .post("/raw-materials")
                .then()
                .statusCode(201)
                .extract().path("id");

        Integer productId = given()
                .contentType(ContentType.JSON)
                .body(Map.of(
                        "code", "PROD-TEST-01",
                        "name", "Chair",
                        "quantity", 50))
                .when()
                .post("/products")
                .then()
                .statusCode(201)
                .extract().path("id");

        given()
                .contentType(ContentType.JSON)
                .body(Map.of(
                        "rawMaterialId", rawMaterialId,
                        "quantity", 10))
                .when()
                .post("/products/" + productId + "/raw-materials")
                .then()
                .statusCode(201);

        given()
                .when()
                .get("/planning")
                .then()
                .statusCode(200)
                .body("$", hasSize(greaterThanOrEqualTo(1)))
                .body("find { it.productName == 'Chair' }.quantity", is(10))
                .body("find { it.productName == 'Chair' }.totalValue", is(500.0f));

    }
}
