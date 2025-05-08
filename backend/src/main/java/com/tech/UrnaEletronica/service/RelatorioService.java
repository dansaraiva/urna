package com.tech.UrnaEletronica.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.tech.UrnaEletronica.dto.ResultadoDTO;
import com.tech.UrnaEletronica.repository.VotoRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RelatorioService {
    
    private final VotoRepository votoRepository;
    
    public List<ResultadoDTO> gerarRelatorioVotos(Long eleicaoId) {
        List<Object[]> resultados = votoRepository.countVotosByChapa(eleicaoId);
        
        long totalVotos = resultados.stream()
                .mapToLong(r -> (Long) r[1])
                .sum();
        
        return resultados.stream()
                .map(r -> {
                    ResultadoDTO dto = new ResultadoDTO();
                    dto.setChapa((String) r[0]);
                    dto.setVotos((Long) r[1]);
                    dto.setPercentual(((Long) r[1]).doubleValue() / totalVotos * 100);
                    return dto;
                })
                .collect(Collectors.toList());
    }
}