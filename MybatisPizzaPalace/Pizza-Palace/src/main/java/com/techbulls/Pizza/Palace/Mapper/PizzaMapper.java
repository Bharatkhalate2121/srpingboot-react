package com.techbulls.Pizza.Palace.Mapper;

import com.techbulls.Pizza.Palace.Entities.Pizza;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PizzaMapper {
    @Select("SELECT * FROM pizza WHERE pizza_id = #{id}")
    Pizza getPizzaById(Integer id);

    @Select("SELECT * FROM pizza")
    List<Pizza> getALlPizzas();

    @Insert("INSERT INTO pizza(name, description, type, image_url, price_regular_size, price_medium_size, price_large_size) " +
            "VALUES (#{name}, #{description}, #{type}, #{imageUrl}, #{priceRegularSize}, #{priceMediumSize}, #{priceLargeSize})")
    @Options(useGeneratedKeys = true, keyProperty = "pizzaId")
    void insertPizza(Pizza pizza);

    @Update("UPDATE pizza SET name = #{name}, description = #{description}, type = #{type}, image_url = #{imageUrl}, " +
            "price_regular_size = #{priceRegularSize}, price_medium_size = #{priceMediumSize}, price_large_size = #{priceLargeSize} " +
            "WHERE pizza_id = #{pizzaId}")
    void updatePizza(Pizza pizza);

    @Delete("DELETE FROM pizza WHERE pizza_id = #{id}")
    void deletePizza(Integer id);

}
