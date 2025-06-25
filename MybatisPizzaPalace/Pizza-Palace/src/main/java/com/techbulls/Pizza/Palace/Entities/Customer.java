package com.techbulls.Pizza.Palace.Entities;



import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Validated
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    
    private Integer customerId;
    @NotNull(message = "name can't be null")
    @NotEmpty(message = "name can't be empty")
    private String firstName;
    private String lastName;
    private String address;
    private String phoneNumber;
    private String emailAddress;

}
