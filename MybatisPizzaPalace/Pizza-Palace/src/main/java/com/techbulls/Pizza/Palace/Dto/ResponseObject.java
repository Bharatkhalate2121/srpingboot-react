package com.techbulls.Pizza.Palace.Dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "success", "message", "data" })
public class ResponseObject {
    private Boolean Success;
    private String Message;
    private Object Data;

    public ResponseObject() {
    }

    public ResponseObject(Boolean success, String message, Object data) {
        Success = success;
        Message = message;
        this.Data = data;
    }

    public Boolean getSuccess() {
        return Success;
    }

    public void setSuccess(Boolean success) {
        Success = success;
    }

    public String getMessage() {
        return Message;
    }

    public void setMessage(String message) {
        Message = message;
    }

    public Object getData() {
        return Data;
    }

    public void setData(Object data) {
        this.Data = data;
    }

    @Override
    public String toString() {
        return "ResponseObject{" +
                "Success='" + Success + '\'' +
                ", Message='" + Message + '\'' +
                ", data=" + Data +
                '}';
    }
}
