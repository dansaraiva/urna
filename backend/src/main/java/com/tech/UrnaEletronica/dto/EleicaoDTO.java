package com.tech.UrnaEletronica.dto;

import lombok.Data;
import java.time.LocalDateTime;

import com.tech.UrnaEletronica.model.EleicaoStatus;

@Data
public class EleicaoDTO {
    private Long id;
    private String nome;
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;
    private EleicaoStatus status;
}