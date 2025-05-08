package com.tech.UrnaEletronica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tech.UrnaEletronica.model.Voto;

import java.util.List;

public interface VotoRepository extends JpaRepository<Voto, Long> {
    boolean existsByIdentificadorUnicoAndEleicaoId(String identificadorUnico, Long eleicaoId);
    
    @Query("SELECT v.chapa.nome as chapa, COUNT(v) as votos " +
           "FROM Voto v WHERE v.eleicao.id = ?1 GROUP BY v.chapa.nome")
    List<Object[]> countVotosByChapa(Long eleicaoId);

    @Query("SELECT COUNT(v) FROM Voto v WHERE v.eleicao.id = :eleicaoId AND v.votoBranco = true")
Long countVotosBrancosByEleicao(@Param("eleicaoId") Long eleicaoId);
}