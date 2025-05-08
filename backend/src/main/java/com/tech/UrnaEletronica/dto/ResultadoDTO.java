package com.tech.UrnaEletronica.dto;

import lombok.Data;

@Data
public class ResultadoDTO {
    private String chapa;
    private Long votos;
    private Double percentual;
}