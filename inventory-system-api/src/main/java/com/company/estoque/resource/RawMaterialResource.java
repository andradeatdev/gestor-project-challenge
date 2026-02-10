package com.company.estoque.resource;

import java.net.URI;
import java.util.List;

import com.company.estoque.entity.RawMaterial;
import com.company.estoque.repository.RawMaterialRepository;

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

@Path("/raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RawMaterialResource {

    @Inject
    RawMaterialRepository repository;

    @GET
    public List<RawMaterial> listAll() {
        return repository.listAll();
    }

    @GET
    @Path("/{id}")
    public RawMaterial findById(@PathParam("id") Long id) {
        return repository.findByIdOptional(id).orElseThrow(() -> new NotFoundException("RawMaterial not found"));
    }

    @POST
    @Transactional
    public Response create(RawMaterial rawMaterial) {
        repository.persist(rawMaterial);
        return Response.created(URI.create("/raw-materials/" + rawMaterial.getId())).entity(rawMaterial).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public RawMaterial update(@PathParam("id") Long id, RawMaterial dto) {
        RawMaterial entity = repository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("RawMaterial not found"));

        entity.setCode(dto.getCode());
        entity.setName(dto.getName());
        entity.setStockQuantity(dto.getStockQuantity());

        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = repository.deleteById(id);
        return deleted ? Response.noContent().build() : Response.status(Response.Status.NOT_FOUND).build();
    }
}
