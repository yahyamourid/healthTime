package com.healthtime.healttimebackend.dao;

import java.util.List;

public interface IDao <T>{
    T findById(int id);
    List<T> findAll();
    T create(T o);
    T update(T o);
    void delete(int id);
}
