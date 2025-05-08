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
                ", EleicaoId: " + votoDTO.getEleicaoId());

        // Validação adicional
        if (votoDTO.getChapaId() == null || votoDTO.getEleicaoId() == null) {
            throw new IllegalArgumentException("ChapaId e EleicaoId não podem ser nulos");
        }

        votoService.registrarVoto(votoDTO);

        Map<String, String> resposta = new HashMap<>();
        resposta.put("mensagem", "Voto registrado com sucesso!");
        return ResponseEntity.ok(resposta);
    }

}
