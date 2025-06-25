package com.techbulls.Pizza.Palace.Entities;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Validated
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Users {
    @NotNull(message = "user Id cant be null")
    @NotEmpty(message = "user Id cant be empty")
    private String userId;
    @NotNull(message = "Password cant be null")
    @NotEmpty(message = "Password cant be Empty")
    private String password;
    private boolean adminUser;
}
