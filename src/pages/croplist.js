import React, { Component, useState, useEffect } from "react";
import Data2 from "./datacrops.js";
import { useGlobalContext } from "./context.js";
import Loading from "./Loading.js";
import axios from "axios";
import methods from "./datamethods.js";

function CropsList(props)
{
    if(props.options.length > 0)
    {
        return <div  style={{marginTop:"70px"}}>
           {props.options.map((curr_val,curr_idx)=>{
        
             return (methods.map((curr_val1)=>{
                if(props.optmethod[curr_idx]==curr_val1.opttemperature)
                {
                    
                    return (<div>
                    <h4>{curr_val}</h4> 
                    
                    <p style={{textAlign:"left",marginLeft:"70px"}}>{curr_val1.method}</p><br/>
                    </div>);
                }
                }));

            } )
            }
        </div>
    }
    else
    {
        return <div>
            <h2>No Crops selected</h2>
        </div>
    }
}

export default CropsList;
// props.optmethod[curr_idx]==curr_val1.opttemperature