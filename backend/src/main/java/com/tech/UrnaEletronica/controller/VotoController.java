package com.tech.UrnaEletronica.controller;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tech.UrnaEletronica.dto.VotoDTO;
import com.tech.UrnaEletronica.service.VotoService;

@RestController
@RequestMapping("/api/votos")
@RequiredArgsConstructor
public class VotoController {

    private final VotoService votoService;

    @PostMapping
    public ResponseEntity<Map<String, String>> registrarVoto(@RequestBody VotoDTO votoDTO) {
        // Log detalhado
        System.out.println("Recebido voto - ChapaId: " + votoDTO.getChapaId() +
                ", EleicaoId: " + votoDTO.getEleicaoId() +
                ", VotoBranco: " + votoDTO.isVotoBranco());

        // Validação modificada: chapaId pode ser nulo se for voto em branco
        if (votoDTO.getEleicaoId() == null) {
            throw new IllegalArgumentException("EleicaoId não pode ser nulo");
        }
        
        // Se for voto em branco, chapaId pode ser nulo
        if (!votoDTO.isVotoBranco() && votoDTO.getChapaId() == null) {
            throw new IllegalArgumentException("ChapaId não pode ser nulo para votos normais");
        }

        votoService.registrarVoto(votoDTO);

        Map<String, String> resposta = new HashMap<>();
        resposta.put("mensagem", "Voto registrado com sucesso!");
        return ResponseEntity.ok(resposta);
    }

    @PostMapping("/branco")
    public ResponseEntity<?> registrarVotoBranco(@RequestBody VotoDTO votoDTO) {
        try {
            votoService.registrarVotoBranco(votoDTO.getEleicaoId());
            
            Map<String, String> resposta = new HashMap<>();
            resposta.put("mensagem", "Voto em branco registrado com sucesso!");
            return ResponseEntity.ok(resposta);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}