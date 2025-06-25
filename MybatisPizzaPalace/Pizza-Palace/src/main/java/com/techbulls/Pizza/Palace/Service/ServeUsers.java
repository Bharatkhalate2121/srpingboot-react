package com.techbulls.Pizza.Palace.Service;

import com.techbulls.Pizza.Palace.Entities.Customer;
import com.techbulls.Pizza.Palace.Entities.Users;
import com.techbulls.Pizza.Palace.Mapper.CustomerMapper;
import com.techbulls.Pizza.Palace.Mapper.UsersMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ServeUsers {

    @Autowired
    private UsersMapper usersMapper;

    @Autowired
    private CustomerMapper customerMapper;
    public void cresteUser(String userId, String password){
        usersMapper.createUser(userId,password);

    }

    public List<Object> getUsers(Users users) {
        Users u = usersMapper.getUsers(users.getUserId(),users.getPassword());

        if (u == null) {
            throw new NoSuchElementException("Invalid credentials");
        }

        Customer c = customerMapper.getCustomerByEmail(u.getUserId());

        List<Object> list = new ArrayList<>();
        list.add(c); // Customer info
        list.add(u); // User info

        return list;
    }


}
