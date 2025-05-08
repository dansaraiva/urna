package com.tech.UrnaEletronica.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.tech.UrnaEletronica.dto.EleicaoDTO;
import com.tech.UrnaEletronica.model.EleicaoStatus;
import com.tech.UrnaEletronica.service.EleicaoService;

import java.util.List;

@RestController
@RequestMapping("/api/eleicoes")
@RequiredArgsConstructor
public class EleicaoController {
    
    private final EleicaoService eleicaoService;
    
    @GetMapping
    public List<EleicaoDTO> listarEleicoes() {
        return eleicaoService.listarEleicoes();
    }
    
    @GetMapping("/{id}")
    public EleicaoDTO buscarEleicao(@PathVariable Long id) {
        return eleicaoService.buscarEleicao(id);
    }
    
    @PostMapping
    public EleicaoDTO cadastrarEleicao(@RequestBody EleicaoDTO eleicaoDTO) {
        return eleicaoService.cadastrarEleicao(eleicaoDTO);
    }
    
    @PutMapping("/{id}/status")
    public EleicaoDTO atualizarStatus(
            @PathVariable Long id,
            @RequestParam EleicaoStatus status) {
        return eleicaoService.atualizarStatus(id, status);
    }
}