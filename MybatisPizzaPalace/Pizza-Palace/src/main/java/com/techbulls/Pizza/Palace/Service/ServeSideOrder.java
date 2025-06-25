package com.techbulls.Pizza.Palace.Service;

import com.techbulls.Pizza.Palace.Dto.MyObj.ResponseObj.SidesResponse;
import com.techbulls.Pizza.Palace.Entities.SidesOrder;
import com.techbulls.Pizza.Palace.Mapper.SidesOrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServeSideOrder {
    @Autowired
    private SidesOrderMapper sidesOrderMapper;

    public SidesOrder createSidesOrder(SidesOrder sidesOrder) {
        sidesOrderMapper.insertSidesOrder(sidesOrder);
        return sidesOrder;
    }

    public List<SidesResponse> getSidesByOrderId(Integer id){
        return sidesOrderMapper.getSidesByOrderId(id);
    }

    public void deleteSideOrderByOrderId(Integer orderId){
        sidesOrderMapper.deleteSidesOrderById(orderId);
    }
}
