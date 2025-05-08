package com.tech.UrnaEletronica.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.tech.UrnaEletronica.dto.ResultadoDTO;
import com.tech.UrnaEletronica.service.RelatorioService;

import java.util.List;

@RestController
@RequestMapping("/api/relatorios")
@RequiredArgsConstructor
public class RelatorioController {
    
    private final RelatorioService relatorioService;
    
    @GetMapping("/votos/{eleicaoId}")
    public List<ResultadoDTO> gerarRelatorioVotos(@PathVariable Long eleicaoId) {
        return relatorioService.gerarRelatorioVotos(eleicaoId);
    }
}