package com.tech.UrnaEletronica.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.tech.UrnaEletronica.dto.EleicaoDTO;
import com.tech.UrnaEletronica.model.Eleicao;
import com.tech.UrnaEletronica.model.EleicaoStatus;
import com.tech.UrnaEletronica.repository.EleicaoRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EleicaoService {
    
    private final EleicaoRepository eleicaoRepository;
    
    public List<EleicaoDTO> listarEleicoes() {
        return eleicaoRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public EleicaoDTO buscarEleicao(Long id) {
        return eleicaoRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Eleição não encontrada"));
    }
    
    public EleicaoDTO cadastrarEleicao(EleicaoDTO eleicaoDTO) {
        Eleicao eleicao = new Eleicao();
        eleicao.setNome(eleicaoDTO.getNome());
        eleicao.setDataInicio(eleicaoDTO.getDataInicio());
        eleicao.setDataFim(eleicaoDTO.getDataFim());
        eleicao.setStatus(eleicaoDTO.getStatus());
        return toDTO(eleicaoRepository.save(eleicao));
    }
    
    public EleicaoDTO atualizarStatus(Long id, EleicaoStatus status) {
        Eleicao eleicao = eleicaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Eleição não encontrada"));
        eleicao.setStatus(status);
        return toDTO(eleicaoRepository.save(eleicao));
    }
    
    private EleicaoDTO toDTO(Eleicao eleicao) {
        EleicaoDTO dto = new EleicaoDTO();
        dto.setId(eleicao.getId());
        dto.setNome(eleicao.getNome());
        dto.setDataInicio(eleicao.getDataInicio());
        dto.setDataFim(eleicao.getDataFim());
        dto.setStatus(eleicao.getStatus());
        return dto;
    }
}