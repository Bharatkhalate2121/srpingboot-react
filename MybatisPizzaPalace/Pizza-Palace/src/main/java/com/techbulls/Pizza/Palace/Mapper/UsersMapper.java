package com.techbulls.Pizza.Palace.Mapper;

import com.techbulls.Pizza.Palace.Entities.Users;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UsersMapper {
    @Insert("insert into users values(#{userId},false,#{password})")
    void createUser(String userId, String password);

    @Select("SELECT * FROM users WHERE user_id = #{userId} AND password = #{password}")
    Users getUsers(@Param("userId") String userId, @Param("password") String password);

}
