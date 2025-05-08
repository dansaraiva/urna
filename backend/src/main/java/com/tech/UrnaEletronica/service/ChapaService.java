package com.tech.UrnaEletronica.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.tech.UrnaEletronica.dto.ChapaDTO;
import com.tech.UrnaEletronica.model.Chapa;
import com.tech.UrnaEletronica.repository.ChapaRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChapaService {
    
    private final ChapaRepository chapaRepository;
    
    public List<ChapaDTO> listarChapas() {
        return chapaRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public ChapaDTO buscarChapa(Long id) {
        return chapaRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Chapa não encontrada"));
    }
    
    public ChapaDTO cadastrarChapa(ChapaDTO chapaDTO) {
        Chapa chapa = new Chapa();
        chapa.setNome(chapaDTO.getNome());
        chapa.setIntegrantes(chapaDTO.getIntegrantes());
        return toDTO(chapaRepository.save(chapa));
    }
    
    public void deletarChapa(Long id) {
        chapaRepository.deleteById(id);
    }
    
    private ChapaDTO toDTO(Chapa chapa) {
        ChapaDTO dto = new ChapaDTO();
        dto.setId(chapa.getId());
        dto.setNome(chapa.getNome());
        dto.setIntegrantes(chapa.getIntegrantes());
        return dto;
    }
}