import React, { Component, useState, useEffect } from "react";
// import logo from "./logo.svg";
import Data2 from "./datacrops.js";
import Navbar from "./Navbar.js"
import { useGlobalContext } from "./context.js";
import Loading from "./Loading.js";
import axios from "axios";
import CropsList from "./croplist.js"

export const Optimal=()=>{
    console.log("j");
    const [profile, setProfile] = useState(1);
    const {polygon_id}=useGlobalContext();
    const [flag,setflag]=useState("0");
    const [loading,setLoading]=useState(0);
    const [soiltemp,setSoiltemp]=useState("286");
    const [optimal,setOptimal]=useState([]);
   
    //  const url=`http://api.agromonitoring.com/agro/1.0/soil?polyid=${polygon_id}&appid=863907a813986c6e76027bccf3b148e3`;
    //  useEffect(() => {
    //     axios.get(url)
    //       .then((res) => {
    //         setSoiltemp(res.t10);
    //         setLoading(0);
    //       });
    //   });
    useEffect(()=>{
    
        const list=[];

        Data2.map((curr_val, curr_idx, arr) => {
            if(Math.abs(soiltemp-curr_val.temperature) <=2)
            list.push(curr_val.name);
        });
        setOptimal(list);
    },[]);
    console.log(optimal);
    console.log(optimal.length == 0)
    if(loading)
    return <Loading/>
    else
    {
        if(!(optimal.length == 0))
       {
        
        return  <div>
        <h3>The Optimal Crops are:</h3>
        {optimal.map((curr_val)=>{
           return (<p>{curr_val}</p>)
            })}
        </div>  
       }
       else{
        return  <div>
        <h2> No Such Optimal Crops</h2>
        </div>
    }
    // },[flag]);
   }
}    
function Soilcrop(props)
{
    const [profile, setProfile] = useState(1);
    const {polygon_id}=useGlobalContext();
    const [loading,setLoading]=useState(0);
    const [soiltemp,setSoiltemp]=useState("280");
    const [optmethod,setOptmethod]=useState([""]);
    console.log(polygon_id);   
    //  const url=`http://api.agromonitoring.com/agro/1.0/soil?polyid=${polygon_id}&appid=863907a813986c6e76027bccf3b148e3`;
    //  useEffect(() => {
    //     axios.get(url)
    //       .then((res) => {
    //         setSoiltemp(res.t10);
    //         setLoading(0);
    //       });
    //   });
   useEffect(()=>{
    const list=[];
    let f=0;
   
        
        props.options.map((curr_val2,curr_idx,arr)=>{
            f=0;
            Data2.map((curr_val, curr_idx, arr) => {
                if(f==1)
                return;
                if(curr_val.name===curr_val2)
                {
                    f=1;
                }
                if(f && Math.abs( soiltemp-curr_val.temperature) <=3)
                list.push("equal");
                else if(f && soiltemp-curr_val.temperature >=4)
                list.push("dec");
                else if(f)
                list.push("inc");
          });
        //   if(x.length)
        //   t=curr_val.temperature
            // console.log(soiltemp-curr_val.temperature);
        
        
    });
    setOptmethod(list);
    
},[])

    if(loading)
    return <Loading/>
    else{
        return  <div>
        <CropsList optmethod={optmethod} options={props.options}/>
        </div>
    }

   
}
   
        
        
export default Soilcrop;
