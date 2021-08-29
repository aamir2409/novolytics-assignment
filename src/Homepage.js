import React,{useEffect,useState,useRef} from 'react'
import "./Homepage.css"
import axios from "axios";


function Homepage() {
    const[images,setImages]=useState([]);
    const[pics,setPics]=useState([])
    const[temp,setTemp]=useState([])
    const[text,setText]=useState("landscapes")
    const[count,setCount]=useState();
    
    useEffect(()=>{
        async function fetchData(){
        // var count;
        // await fetch("http://localhost:5000")
        // .then(res => res.json())
        // .then(data =>{ count=data.result[0].count})

        const response = await axios.get("https://api.unsplash.com/search/photos",{
            params:{ query: text, per_page: 8},
            headers:{
                Authorization: 'Client-ID Nn45REE5MD-xqcaTBcemQI1C8nDggCKxPZTrpOB53fk'
            }
        })
        setImages(response.data.results);
        setPics(response.data.results)
        
    }
    fetchData();
     console.log(images)
    
    },[text])
    
    function handleChange(){
        setText(document.getElementById("titles").value);
        setTemp([])
    }
    
    function drag(e,id){
     
        console.log("drag started")
        e.dataTransfer.setData("id",id)
    }
    function drop(e){
        //e.preventDefault();
        var data = e.dataTransfer.getData("id");
        console.log("dropped something")
        setImages(images.filter(image => image.id !==data))
        var pr=images.filter(image => image.id ===data)
        setTemp(prevArray => ([...prevArray,pr[0]]))
      
        
    }
    function drop2(e){
        //e.preventDefault();
        var data = e.dataTransfer.getData("id");
        console.log("dropped something2")
        console.log(data)
        var item=pics.filter(pic => pic.id === data)
        console.log(item[0])
        setImages(prevArray => ([...prevArray,item[0]]))
        setTemp(temp.filter(item=> item.id !== data))
        console.log(images)
    }
    
    function allowDrop(e){
        e.preventDefault();
        // console.log("dropped something")
    }
    return (
        <div className="home">
            <div className="home_left">
                <div>
                    <h3>Categories</h3>
                    <select name="titles" id="titles" onChange={handleChange}>
                        <option  value="landscapes">Landscapes</option>
                        <option value="phones">Phones</option>
                        <option value="beaches">Beaches</option>
                        <option value="houses">Houses</option>
                    </select>
                </div>

                <div className="home_left_below"  onDrop={(e)=>drop(e)} onDragOver={(e)=>allowDrop(e)} >
                    <p>Drag here to delete</p>
                    {temp.length === 0? "no deleted pic":
                        <div>
                        {temp.map(item=>{
                            return(
                                <div className="bottom_inner" id="new" draggable="true"  onDragStart={(e)=> drag(e,item.id)}>
                                    <div>
                                        <img src={item.urls.regular }/>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    }
                    
                    
                </div>
            </div>
            <div className="home_right">
                <div className="right_top">
                    {images.length === 0? "Loading" : 
                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img  class="d-block w-100" style={{maxHeight:"600px",minWidth:"500px"}} src={images[0].urls.regular} alt="First slide" />
                    </div>
                    {/* <div class="carousel-item">
                    <img  class="d-block w-100" style={{maxHeight:"600px",minWidth:"500px"}} src={images[1].urls.regular} alt="Second slide" />
                    </div>
                    <div class="carousel-item">
                    <img   class="d-block w-100" style={{maxHeight:"600px",minWidth:"500px"}} src={images[2].urls.regular} alt="Third slide" />
                    </div>  */}
                        {images.map(image=> {
                            return(
                                <div class="carousel-item">
                                <img  class="d-block w-100" style={{maxHeight:"600px",minWidth:"500px"}} src={image.urls.regular} alt="First slide" />
                                </div>
                            );
                        })}
                    </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
                </div>
                }
                </div>
                <div className="right_bottom" onDrop={(e)=> drop2(e)}>
                    {images.length ===0? "loading":
                        <div>
                            {images.map(image=>{
                                return(
                                    <div className="bottom_inner" id="new" draggable="true"  onDragOver={(e)=>allowDrop(e)} onDragStart={(e)=> drag(e,image.id)}>
                                        <div>
                                            <img src={image.urls.regular }/>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                    }
                </div>
            </div>
            
        </div>
    )
}

export default Homepage