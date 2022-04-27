import styled from "styled-components";

export const Container = styled.div`
    width: 200px;
    height: 50px;
    background-color: #1550FF;
    color: #FFF;
    border-radius: 10px;
    display: flex;
    cursor: pointer;    
    opacity: 1;
    transition: all ease .3s;

    &:hover {
        opacity: .9;
        transform: translate(0, -7%);
        box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, .2);
        transition: ease-in-out 300ms;
    }

`;
export const IconArea = styled.div`
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgba(255, 255, 255, .2);
    padding: 0 15px;
`;
export const Icon = styled.img`
    height: 20px;   
`;
export const Label = styled.div`
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    flex: 1;
    font-size: 18px;
`;