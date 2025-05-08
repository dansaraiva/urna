package com.tech.UrnaEletronica.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tech.UrnaEletronica.model.Eleicao;
import com.tech.UrnaEletronica.model.EleicaoStatus;

import java.util.Optional;

public interface EleicaoRepository extends JpaRepository<Eleicao, Long> {
    Optional<Eleicao> findByStatus(EleicaoStatus status);
}