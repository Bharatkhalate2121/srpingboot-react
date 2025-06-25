package com.techbulls.Pizza.Palace.Dto.MyObj.RequestObj;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangeAddressObj {
    @NotNull(message = "orderId Cannot be bull")
    private Integer orderId;
    @NotNull(message = "Address Cannot be null Cannot be bull")
    private String deliveryAddress;
}
