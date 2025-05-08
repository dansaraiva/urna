package com.tech.UrnaEletronica.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.tech.UrnaEletronica.dto.VotoDTO;
import com.tech.UrnaEletronica.model.Chapa;
import com.tech.UrnaEletronica.model.Eleicao;
import com.tech.UrnaEletronica.model.Voto;
import com.tech.UrnaEletronica.repository.ChapaRepository;
import com.tech.UrnaEletronica.repository.EleicaoRepository;
import com.tech.UrnaEletronica.repository.VotoRepository;

import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VotoService {
    private final VotoRepository votoRepository;
    private final ChapaRepository chapaRepository;
    private final EleicaoRepository eleicaoRepository;
    
    public void registrarVoto(VotoDTO votoDTO) {
        Eleicao eleicao = eleicaoRepository.findById(votoDTO.getEleicaoId())
                .orElseThrow(() -> new EntityNotFoundException("Eleição não encontrada"));
        
        String identificadorUnico = UUID.randomUUID().toString();
        
        if (votoRepository.existsByIdentificadorUnicoAndEleicaoId(
                identificadorUnico, eleicao.getId())) {
            throw new IllegalStateException("Voto já registrado");
        }
        
        Voto voto = new Voto();
        
        // Se não for voto em branco, busca a chapa
        if (!votoDTO.isVotoBranco()) {
            Chapa chapa = chapaRepository.findById(votoDTO.getChapaId())
                    .orElseThrow(() -> new EntityNotFoundException("Chapa não encontrada"));
            voto.setChapa(chapa);
        }
        
        voto.setEleicao(eleicao);
        voto.setDataHora(LocalDateTime.now());
        voto.setIdentificadorUnico(identificadorUnico);
        voto.setVotoBranco(votoDTO.isVotoBranco());
        
        votoRepository.save(voto);
    }

    public void registrarVotoBranco(Long eleicaoId) {
        VotoDTO votoDTO = new VotoDTO();
        votoDTO.setEleicaoId(eleicaoId);
        votoDTO.setVotoBranco(true);
        registrarVoto(votoDTO);
    }
}