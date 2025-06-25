package com.techbulls.Pizza.Palace.ExceptionHandlers;

import org.springframework.stereotype.Component;

@Component
public class Error {
    private Integer Code;
    private String Message;

    public Error() {
    }

    public Error(Integer code, String message) {
        Code = code;
        Message = message;
    }

    public Integer getCode() {
        return Code;
    }

    public void setCode(Integer code) {
        Code = code;
    }

    public String getMessage() {
        return Message;
    }

    public void setMessage(String message) {
        Message = message;
    }

    @Override
    public String toString() {
        return "Error{" +
                "Code=" + Code +
                ", Message='" + Message + '\'' +
                '}';
    }
}
