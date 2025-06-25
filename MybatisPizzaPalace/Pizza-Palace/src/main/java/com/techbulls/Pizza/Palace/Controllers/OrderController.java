package com.techbulls.Pizza.Palace.Controllers;


import com.techbulls.Pizza.Palace.Dto.MyObj.RequestObj.ChangeAddressObj;
import com.techbulls.Pizza.Palace.Dto.MyObj.RequestObj.OrderRequest;
import com.techbulls.Pizza.Palace.Dto.MyObj.ResponseObj.OrderResponse;
import com.techbulls.Pizza.Palace.Dto.OrderList;
import com.techbulls.Pizza.Palace.Dto.PizzaList;
import com.techbulls.Pizza.Palace.Dto.Requests.OrderRequestObj;
import com.techbulls.Pizza.Palace.Dto.Requests.OrderUpdateRequestObj;
import com.techbulls.Pizza.Palace.Dto.Response.OrdersResponseObj;
import com.techbulls.Pizza.Palace.Dto.ResponseObject;
import com.techbulls.Pizza.Palace.Service.ServeOrder;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private ServeOrder serveOrder;

    @Autowired
    public void setServeOrder(ServeOrder serveOrder){
        this.serveOrder=serveOrder;
    }


//    @PostMapping
//    public ResponseEntity<?> createOrder(@RequestBody OrderRequestObj orderRequestObj){
//        OrdersResponseObj ordersResponseObj=serveOrder.createOrder(orderRequestObj);
//        OrderList data=new OrderList(List.of(ordersResponseObj));
//        ResponseObject responseObject=new ResponseObject(true,"Order Created Successfully",data);
//        return ResponseEntity.ok(responseObject);
//    }


    @PostMapping
    public ResponseEntity<?> createOrder (@Valid @RequestBody OrderRequest orderRequest){
        OrderResponse orderResponse=serveOrder.createMyOrder(orderRequest);
        OrderList data=new OrderList(List.of(orderResponse));
        ResponseObject responseObject=new ResponseObject(true,"Order Created Successfully",data);
        return ResponseEntity.ok(responseObject);

    }


    @PutMapping
    public ResponseEntity<?> changeOrderAddress (@Valid @RequestBody ChangeAddressObj changeAddressObj){
        serveOrder.changeAddressByOrderId(changeAddressObj);
        OrderList data=new OrderList();
        ResponseObject responseObject=new ResponseObject(true,"Address Changed Successfully",data);
        return ResponseEntity.ok(responseObject);

    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable Integer orderId){
        serveOrder.deleteOrderByOrderId(orderId);
        OrderList data=new OrderList();
        ResponseObject responseObject=new ResponseObject(true,"Deleted Successfully",data);
        return ResponseEntity.ok(responseObject);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getOrdersForCustomer(@PathVariable Integer id){
        List<OrderResponse> list=serveOrder.getOrderByUserId(id);
        OrderList data=new OrderList(list);
        ResponseObject responseObject=new ResponseObject(true,"Data Found",data);
        return ResponseEntity.ok(responseObject);
    }

    @GetMapping
    public ResponseEntity<?> getAllOrders(){
        List<OrderResponse> list=serveOrder.getAllOrdersWithDetails();
        OrderList data=new OrderList(list);
        ResponseObject responseObject=new ResponseObject(true,"Data Found",data);
        return ResponseEntity.ok(responseObject);
    }



//    @GetMapping("/{id}")
//    public ResponseEntity<?> getOrderDetailsById(@PathVariable Integer id){
//        OrdersResponseObj ordersResponseObj=serveOrder.getOrderDetailsById(id);
//        OrderList data=new OrderList(List.of(ordersResponse));
//        ResponseObject responseObject=new ResponseObject(true,"Data Found",data);
//        return ResponseEntity.ok(responseObject);
//    }
//
//    @GetMapping
//    public ResponseEntity<?> getALlOrderDetails(){
//        List<OrdersResponseObj> ordersResponseObjList=serveOrder.getAllOrderDetails();
//        OrderList data=new OrderList(ordersResponseObjList);
//        ResponseObject responseObject=new ResponseObject(true,"Data Found",data);
//        return ResponseEntity.ok(responseObject);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateOrder(@RequestBody OrderUpdateRequestObj orderUpdateRequestObj,@PathVariable Integer id){
//        OrdersResponseObj ordersResponseObj=serveOrder.updateOrdersWithDetails(id, orderUpdateRequestObj);
//        OrderList data=new OrderList(List.of(ordersResponseObj));
//        ResponseObject responseObject=new ResponseObject(true,"Data Found",data);
//        return ResponseEntity.ok(responseObject);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteOrder(@PathVariable Integer id){
//        serveOrder.deleteOrderWithDetails(id);
//        return ResponseEntity.status(HttpStatus.OK).build();
//    }


}
