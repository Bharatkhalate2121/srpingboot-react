package com.techbulls.Pizza.Palace.Service;

import com.techbulls.Pizza.Palace.Entities.CrustOrder;
import com.techbulls.Pizza.Palace.Mapper.CrustOrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServeCrustOrder {

    @Autowired
    private CrustOrderMapper crustOrderMapper;

    public CrustOrder createCrustOrder(CrustOrder crustOrder){
        crustOrderMapper.createCrustOrder(crustOrder);
        return crustOrder;
    }

    public Integer getCrustIdByOrderLineId(Integer order_line_id){
        return crustOrderMapper.getCrustByOrderLineId(order_line_id);
    }

    public void deleteCrustOrderByOrderId(Integer orderId){
        crustOrderMapper.deleteCrustOrderByOrderId(orderId);
    }
}
