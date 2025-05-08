package com.tech.UrnaEletronica.controller;


import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.tech.UrnaEletronica.dto.ChapaDTO;
import com.tech.UrnaEletronica.service.ChapaService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chapas")
@RequiredArgsConstructor
public class ChapaController {
    
    private final ChapaService chapaService;
    
    @GetMapping
    public List<ChapaDTO> listarChapas() {
        return chapaService.listarChapas();
    }
    
    @GetMapping("/{id}")
    public ChapaDTO buscarChapa(@PathVariable Long id) {
        return chapaService.buscarChapa(id);
    }
    
    @PostMapping
    public ChapaDTO cadastrarChapa(@RequestBody ChapaDTO chapaDTO) {
        return chapaService.cadastrarChapa(chapaDTO);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarChapa(@PathVariable Long id) {
        chapaService.deletarChapa(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFoto(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            String uniqueFileName = System.currentTimeMillis() + "_" + fileName;
            Path uploadPath = Paths.get("uploads");
            
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            
            Path filePath = uploadPath.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
            String fileUrl = "/uploads/" + uniqueFileName;
            
            Map<String, String> response = new HashMap<>();
            response.put("url", fileUrl);
            
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}