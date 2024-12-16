package com.healthtime.healttimebackend.dto;

import com.healthtime.healttimebackend.entities.Specialite;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchResult {
    private List<Specialite> specialites;
    private List<SoignantDTO> soignants;
}