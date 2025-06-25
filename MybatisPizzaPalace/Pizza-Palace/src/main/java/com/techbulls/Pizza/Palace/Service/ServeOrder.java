package com.techbulls.Pizza.Palace.Service;

import com.techbulls.Pizza.Palace.Dto.MyObj.RequestObj.ChangeAddressObj;
import com.techbulls.Pizza.Palace.Dto.MyObj.RequestObj.OrderRequest;
import com.techbulls.Pizza.Palace.Dto.MyObj.ResponseObj.OrderResponse;
import com.techbulls.Pizza.Palace.Dto.MyObj.ResponseObj.SidesResponse;
import com.techbulls.Pizza.Palace.Dto.Requests.OrderRequestObj;
import com.techbulls.Pizza.Palace.Dto.Requests.OrderUpdateRequestObj;
import com.techbulls.Pizza.Palace.Dto.Response.OrdersResponseObj;
import com.techbulls.Pizza.Palace.Dto.Response.PizzaResponseObj;
import com.techbulls.Pizza.Palace.Dto.MyObj.ResponseObj.PizzaResponse;
import com.techbulls.Pizza.Palace.Entities.*;
import com.techbulls.Pizza.Palace.Mapper.OrderLineMapper;
import com.techbulls.Pizza.Palace.Mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ServeOrder {
    private ServeCustomer serveCustomer;
    private OrderMapper orderMapper;
    private ServePizza servePizza;
    private ServeOrderLine serveOrderLine;
    private OrderLineMapper orderLineMapper;
    @Autowired
    private ServeCrustOrder serveCrustOrder;

    @Autowired
    private ServeToppingOrder serveToppingOrder;

    @Autowired
    private ServeSideOrder serveSideOrder;



    @Autowired
    public void setServeCustomer(ServeCustomer serveCustomer) {
        this.serveCustomer = serveCustomer;
    }

    @Autowired
    public void setServePizza(ServePizza servePizza) {
        this.servePizza = servePizza;
    }

    @Autowired
    public void setOrderMapper(OrderMapper orderMapper) {
        this.orderMapper = orderMapper;
    }

    @Autowired
    public void setServeOrderLine(ServeOrderLine serveOrderLine) {
        this.serveOrderLine = serveOrderLine;
    }

    @Autowired
    public void setOrderLineMapper (OrderLineMapper orderLineMapper){
        this.orderLineMapper=orderLineMapper;
    }

//
//    public OrdersResponseObj createOrder(OrderRequestObj orderRequestObj){
//        serveCustomer.getCustomerById(orderRequestObj.getCustomerId());
//        try {
//            servePizza.getPizzaById(orderRequestObj.getPizza().get(0).getPizzaId());
//        }
//        catch(IndexOutOfBoundsException ex){
//            throw new NoSuchElementException("Please Select atleast 1 pizza");
//        }
//
//        Orders order=new Orders();
//        order.setCustomerId(orderRequestObj.getCustomerId());
//        order.setDeliveryAddress(orderRequestObj.getDeliveryAddress());
//        order.setTotalAmount(orderRequestObj.getTotalAmount());
//
//        orderMapper.insertOrder(order);
//        OrdersResponseObj ordersResponseObj=new OrdersResponseObj();
//        ordersResponseObj.setOrderId(order.getOrderId());
//        ordersResponseObj.setCustomerId(order.getCustomerId());
//        ordersResponseObj.setDeliveryAddress(order.getDeliveryAddress());
//        ordersResponseObj.setStatus("CREATED");
//        ordersResponseObj.setTotalAmount(order.getTotalAmount());
//        ordersResponseObj.setOrderTime(LocalDateTime.now());
//
//        OrderLine orderLine=new OrderLine();
//        PizzaResponseObj pizzaResponseObj=new PizzaResponseObj();
//        List<PizzaResponseObj> pizzaResponseObjList=new ArrayList<PizzaResponseObj>();
//
//
//        orderRequestObj.getPizza().forEach((ele)->{
//            orderLine.setOrderId(order.getOrderId());
//            orderLine.setPizzaId(ele.getPizzaId());
//            orderLine.setSize(ele.getSize());
//            orderLine.setQuantity(ele.getQuantity());
//            orderLine.setTotalPrice(orderRequestObj.getTotalAmount());
//            orderLineMapper.insertOrderLine(orderLine);
//            pizzaResponseObj.setPizzaId(orderLine.getPizzaId());
//            pizzaResponseObj.setSize(orderLine.getSize());
//            pizzaResponseObj.setQuantity(orderLine.getQuantity());
//            pizzaResponseObj.setSubTotal(orderLine.getTotalPrice());
//            pizzaResponseObjList.add(pizzaResponseObj);
//        });
//
//        ordersResponseObj.setPizza(pizzaResponseObjList);
//        return  ordersResponseObj;
//
//    }

    public Orders getOrderById(Integer id){
        Orders order= orderMapper.getOrderById(id);
        if(order!=null){
            return order;
        }
        throw new NoSuchElementException("No order exists with id "+id+"");
    }

    @Transactional
    public OrderResponse createMyOrder(OrderRequest orderRequest){

        serveCustomer.getCustomerById(orderRequest.getCustomerId());
        try {
            orderRequest.getPizza().forEach((pizza)->{
                servePizza.getPizzaById(pizza.getPizzaId());
            });
        }
        catch(IndexOutOfBoundsException ex){
            throw new NoSuchElementException("Please Select atleast 1 pizza");
        }

        Orders order=new Orders();
        order.setCustomerId(orderRequest.getCustomerId());
        order.setDeliveryAddress(orderRequest.getDeliveryAddress());
        order.setTotalAmount(orderRequest.getTotalAmount());

        orderMapper.insertOrder(order);


        OrderResponse orderResponse=new OrderResponse();
        orderResponse.setOrderId(order.getOrderId());
        orderResponse.setCustomerId(order.getCustomerId());
        orderResponse.setDeliveryAddress(order.getDeliveryAddress());
        orderResponse.setStatus("CREATED");
        orderResponse.setTotalAmount(order.getTotalAmount());
        orderResponse.setOrderTime(LocalDateTime.now());
        orderResponse.setValid(true);

        OrderLine orderLine=new OrderLine();

        List<PizzaResponse> pizzaResponseList=new ArrayList<PizzaResponse>();



        orderRequest.getPizza().forEach((ele)->{

            PizzaResponse pizzaResponse=new PizzaResponse();
            ToppingOrder toppingOrder=new ToppingOrder();
            orderLine.setOrderId(order.getOrderId());
            orderLine.setPizzaId(ele.getPizzaId());
            orderLine.setSize(ele.getSize());
            orderLine.setQuantity(ele.getQuantity());
            orderLine.setTotalPrice(ele.getAmount());
            orderLineMapper.insertOrderLine(orderLine);
            CrustOrder crustOrder=new CrustOrder();
            crustOrder.setOrderId(order.getOrderId());
            crustOrder.setOrderLineId(orderLine.getOrderLineId());

            crustOrder.setCrustId(ele.getCrustId());
            serveCrustOrder.createCrustOrder(crustOrder);
            pizzaResponse.setCrustId(ele.getCrustId());

            ele.getToppingsId().forEach(toppingId -> {
                toppingOrder.setOrderId(order.getOrderId());
                toppingOrder.setOrderLineId(orderLine.getOrderLineId());
                toppingOrder.setToppingId(toppingId);
                serveToppingOrder.createToppingOrder(toppingOrder);
            });

            pizzaResponse.setToppingsId(ele.getToppingsId());
            pizzaResponse.setPizzaId(orderLine.getPizzaId());
            pizzaResponse.setSize(orderLine.getSize());
            pizzaResponse.setQuantity(orderLine.getQuantity());
            pizzaResponse.setSubTotal(orderLine.getTotalPrice());
            pizzaResponseList.add(pizzaResponse);
        });

        SidesOrder sidesOrder=new SidesOrder();
        orderRequest.getSides().forEach((side)->{
            sidesOrder.setOrderId(order.getOrderId());
            sidesOrder.setSidesId(side.getSidesId());
            sidesOrder.setQuantity(side.getQuantity());
            serveSideOrder.createSidesOrder(sidesOrder);
        });

        List<SidesResponse> sidesResponseList=new ArrayList<SidesResponse>();

        orderRequest.getSides().forEach((side)->{
            SidesResponse sidesResponse=new SidesResponse();
            sidesResponse.setSidesId(side.getSidesId());
            sidesResponse.setQuantity(side.getQuantity());
            sidesResponseList.add(sidesResponse);
        });
        orderResponse.setSides(sidesResponseList);
        orderResponse.setPizza(pizzaResponseList);
        return  orderResponse;

    }


    public OrdersResponseObj getOrderDetailsById(Integer id){
        Orders order=this.getOrderById(id);

        OrdersResponseObj ordersResponseObj=new OrdersResponseObj();
        ordersResponseObj.setOrderId(order.getOrderId());
        ordersResponseObj.setCustomerId(order.getCustomerId());
        ordersResponseObj.setDeliveryAddress(order.getDeliveryAddress());
        ordersResponseObj.setStatus(order.getStatus());
        ordersResponseObj.setTotalAmount(order.getTotalAmount());
        ordersResponseObj.setOrderTime(order.getOrderDateTime());
        ordersResponseObj.setPizza(serveOrderLine.getOrderPizzaDetails(order.getOrderId()));

        return ordersResponseObj;
    }

    public List<OrdersResponseObj> getAllOrderDetails(){
        List<Orders>ordersList=orderMapper.getAllOrders();
        List<OrdersResponseObj> responseObjectList=new ArrayList<OrdersResponseObj>();
        ordersList.forEach(order->{
            OrdersResponseObj ordersResponseObj=new OrdersResponseObj();
            ordersResponseObj.setOrderId(order.getOrderId());
            ordersResponseObj.setCustomerId(order.getCustomerId());
            ordersResponseObj.setDeliveryAddress(order.getDeliveryAddress());
            ordersResponseObj.setStatus(order.getStatus());
            ordersResponseObj.setTotalAmount(order.getTotalAmount());
            ordersResponseObj.setOrderTime(order.getOrderDateTime());
            ordersResponseObj.setPizza(serveOrderLine.getOrderPizzaDetails(order.getOrderId()));
            responseObjectList.add(ordersResponseObj);
        });
        return responseObjectList;
    }

    public Orders updateOrder( OrderUpdateRequestObj orderUpdateRequestObj, Integer id){
        orderMapper.updateOrder(orderUpdateRequestObj.getDeliveryAddress(),id);
        Orders order=this.getOrderById(id);
        return order;
    }




    public OrdersResponseObj updateOrdersWithDetails(Integer id,OrderUpdateRequestObj orderUpdateRequestObj){
        this.getOrderById(id);
        Orders order=this.updateOrder(orderUpdateRequestObj,id);

        OrdersResponseObj ordersResponseObj=new OrdersResponseObj();
        ordersResponseObj.setOrderId(order.getOrderId());
        ordersResponseObj.setCustomerId(order.getCustomerId());
        ordersResponseObj.setDeliveryAddress(order.getDeliveryAddress());
        ordersResponseObj.setStatus(order.getStatus());
        ordersResponseObj.setTotalAmount(order.getTotalAmount());
        ordersResponseObj.setOrderTime(order.getOrderDateTime());
        ordersResponseObj.setPizza(serveOrderLine.getOrderPizzaDetails(order.getOrderId()));



        serveOrderLine.deleteOrderLineByOrderId(id);
        OrderLine orderLine=new OrderLine();
        PizzaResponseObj pizzaResponseObj=new PizzaResponseObj();
        List<PizzaResponseObj> pizzaResponseObjList=new ArrayList<PizzaResponseObj>();

        orderUpdateRequestObj.getPizza().forEach((ele)->{
            orderLine.setOrderId(order.getOrderId());
            orderLine.setPizzaId(ele.getPizzaId());
            orderLine.setSize(ele.getSize());
            orderLine.setQuantity(ele.getQuantity());
            orderLine.setTotalPrice(order.getTotalAmount());
            orderLineMapper.insertOrderLine(orderLine);
            pizzaResponseObj.setPizzaId(orderLine.getPizzaId());
            pizzaResponseObj.setSize(orderLine.getSize());
            pizzaResponseObj.setQuantity(orderLine.getQuantity());
            pizzaResponseObj.setSubTotal(orderLine.getTotalPrice());
            pizzaResponseObjList.add(pizzaResponseObj);
        });

        ordersResponseObj.setPizza(pizzaResponseObjList);
        return  ordersResponseObj;
    }


    public void deleteOrderWithDetails(Integer id){
        this.getOrderById(id);
        serveOrderLine.deleteOrderLineByOrderId(id);
        orderMapper.deleteOrder(id);
    }

    @Transactional
    public List<OrderResponse> getOrderByUserId(Integer userId){
        serveCustomer.getCustomerById(userId);
        List<Orders> ordersList=orderMapper.getAllOrderByUserId(userId);
        List<OrderResponse> orderResponseList=new ArrayList<OrderResponse>();

        ordersList.forEach((order)->{
            List<PizzaResponse> pizzaResponseList=new ArrayList<PizzaResponse>();
            List<OrderLine> orderLineList=serveOrderLine.getOrderLineDetailsByOrderId(order.getOrderId());
            orderLineList.forEach((orderLine) -> {
                PizzaResponse pizzaResponse=new PizzaResponse();
                pizzaResponse.setPizzaId(orderLine.getPizzaId());
                pizzaResponse.setSize(orderLine.getSize());
                pizzaResponse.setQuantity(orderLine.getQuantity());
                pizzaResponse.setSubTotal(orderLine.getTotalPrice());
                pizzaResponse.setCrustId(serveCrustOrder.getCrustIdByOrderLineId(orderLine.getOrderId()));
                pizzaResponse.setToppingsId(serveToppingOrder.getToppingsIdByOrderLineID(orderLine.getOrderId()));
                pizzaResponseList.add(pizzaResponse);
            });

            OrderResponse orderResponse=new OrderResponse();
            orderResponse.setOrderId(order.getOrderId());
            orderResponse.setCustomerId(order.getCustomerId());
            orderResponse.setDeliveryAddress(order.getDeliveryAddress());
            orderResponse.setTotalAmount(order.getTotalAmount());
            orderResponse.setStatus(order.getStatus());
            orderResponse.setOrderTime(order.getOrderDateTime());
            orderResponse.setValid(order.getValid());
            orderResponse.setPizza(pizzaResponseList);
            orderResponse.setSides(serveSideOrder.getSidesByOrderId(order.getOrderId()));
            orderResponseList.add(orderResponse);
        });


        return orderResponseList;

    }


    @Transactional
    public List<OrderResponse> getAllOrdersWithDetails(){
        List<Orders> ordersList=orderMapper.getAllOrders();
        List<OrderResponse> orderResponseList=new ArrayList<OrderResponse>();

        ordersList.forEach((order)->{
            List<PizzaResponse> pizzaResponseList=new ArrayList<PizzaResponse>();
            List<OrderLine> orderLineList=serveOrderLine.getOrderLineDetailsByOrderId(order.getOrderId());
            orderLineList.forEach((orderLine) -> {
                PizzaResponse pizzaResponse=new PizzaResponse();
                pizzaResponse.setPizzaId(orderLine.getPizzaId());
                pizzaResponse.setSize(orderLine.getSize());
                pizzaResponse.setQuantity(orderLine.getQuantity());
                pizzaResponse.setSubTotal(orderLine.getTotalPrice());
                pizzaResponse.setCrustId(serveCrustOrder.getCrustIdByOrderLineId(orderLine.getOrderId()));
                pizzaResponse.setToppingsId(serveToppingOrder.getToppingsIdByOrderLineID(orderLine.getOrderId()));
                pizzaResponseList.add(pizzaResponse);
            });

            OrderResponse orderResponse=new OrderResponse();
            orderResponse.setOrderId(order.getOrderId());
            orderResponse.setCustomerId(order.getCustomerId());
            orderResponse.setDeliveryAddress(order.getDeliveryAddress());
            orderResponse.setTotalAmount(order.getTotalAmount());
            orderResponse.setStatus(order.getStatus());
            orderResponse.setOrderTime(order.getOrderDateTime());
            orderResponse.setValid(order.getValid());
            orderResponse.setPizza(pizzaResponseList);
            orderResponse.setSides(serveSideOrder.getSidesByOrderId(order.getOrderId()));
            orderResponseList.add(orderResponse);
        });


        return orderResponseList;

    }


    public void changeAddressByOrderId(ChangeAddressObj changeAddressObj){
        this.getOrderById(changeAddressObj.getOrderId());
        orderMapper.updateOrderAddress(changeAddressObj);
    }

    @Transactional
    public void deleteOrderByOrderId(Integer orderId){
        this.getOrderById(orderId);
//        serveCrustOrder.deleteCrustOrderByOrderId(orderId);
//        serveToppingOrder.deleteToppingOrderByOrderId(orderId);
//        serveOrderLine.deleteOrderLineByOrderId(orderId);
//        serveSideOrder.deleteSideOrderByOrderId(orderId);
        orderMapper.deleteOrder(orderId);
    }


}
