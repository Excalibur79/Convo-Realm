import React from "react";
import "../styles/Avatar.scss";

//------------------------------------- Images Import -----------------------
import ant from "../Avatars/ant.png";
import antilope from "../Avatars/antilope.png";
import bear from "../Avatars/bear.png";
import bee from "../Avatars/bee.png";
import bug from "../Avatars/bug.png";
import bunny from "../Avatars/bunny.png";
import butterfly from "../Avatars/butterfly.png";
import cat from "../Avatars/cat.png";
import caterpillar from "../Avatars/caterpillar.png";
import chameleon from "../Avatars/chameleon.png";
import cobra from "../Avatars/cobra.png";
import cow from "../Avatars/cow.png";
import coyote from "../Avatars/coyote.png";
import crab from "../Avatars/crab.png";
import crocodile from "../Avatars/crocodile.png";
import dog from "../Avatars/dog.png";
import duck from "../Avatars/duck.png";
import elephant from "../Avatars/elephant.png";
import fish from "../Avatars/fish.png";
import frog from "../Avatars/frog.png";
import giraffe from "../Avatars/giraffe.png";
import goldfish from "../Avatars/goldfish.png";
import gorilla from "../Avatars/gorilla.png";
import horse from "../Avatars/horse.png";
import jaguar from "../Avatars/jaguar.png";
import koala from "../Avatars/koala.png";
import lion from "../Avatars/lion.png";
import lizard from "../Avatars/lizard.png";
import lobster from "../Avatars/lobster.png";
import medusa from "../Avatars/medusa.png";
import octopus from "../Avatars/octopus.png";
import ostrich from "../Avatars/ostrich.png";
import owl from "../Avatars/owl.png";
import parrot from "../Avatars/parrot.png";
import pig from "../Avatars/pig.png";
import rabbit from "../Avatars/rabbit.png";
import reindeer from "../Avatars/reindeer.png";
import rooster from "../Avatars/rooster.png";
import scorpion from "../Avatars/scorpion.png";
import seastar from "../Avatars/sea star.png";
import shark from "../Avatars/shark.png";
import sheep from "../Avatars/sheep.png";
import snake from "../Avatars/snake.png";
import spider from "../Avatars/spider.png";
import stingray from "../Avatars/stingray.png";
import tasmaniandevil from "../Avatars/tasmanian devil.png";
import toucan from "../Avatars/toucan.png";
import turtle from "../Avatars/turtle.png";
import wolf from "../Avatars/wolf.png";
import zebra from "../Avatars/zebra.png";





//---------------------------------------------------------------------------







function Avatar(props)
{
    //-----------------   Image Config --------------------------------------
    var x=props.name;
    if(x==="ant"){var y=ant;}
    if(x==="antilope"){var y=antilope;}
    if(x==="bear"){var y=bear;}
    if(x==="bee"){var y=bee;}
    if(x==="bug"){var y=bug;}
    if(x==="bunny"){var y=bunny;}
    if(x==="butterfly"){var y=butterfly;}
    if(x==="cat"){var y=cat;}
    if(x==="caterpillar"){var y=caterpillar;}
    if(x==="chameleon"){var y=chameleon;}
    if(x==="cobra"){var y=cobra;}
    if(x==="cow"){var y=cow;}
    if(x==="coyote"){var y=coyote;}
    if(x==="crab"){var y=crab;}
    if(x==="crocodile"){var y=crocodile;}
    if(x==="dog"){var y=dog;}
    if(x==="duck"){var y=duck;}
    if(x==="elephant"){var y=elephant;}
    if(x==="fish"){var y=fish;}
    if(x==="frog"){var y=frog;}
    if(x==="giraffe"){var y=giraffe;}
    if(x==="goldfish"){var y=goldfish;}
    if(x==="gorilla"){var y=gorilla;}
    if(x==="horse"){var y=horse;}
    if(x==="jaguar"){var y=jaguar;}
    if(x==="koala"){var y=koala;}
    if(x==="lion"){var y=lion;}
    if(x==="lizard"){var y=lizard;}
    if(x==="lobster"){var y=lobster;}
    if(x==="medusa"){var y=medusa;}
    if(x==="octopus"){var y=octopus;}
    if(x==="ostrich"){var y=ostrich;}
    if(x==="owl"){var y=owl;}
    if(x==="parrot"){var y=parrot;}
    if(x==="pig"){var y=pig;}
    if(x==="rabbit"){var y=rabbit;}
    if(x==="reindeer"){var y=reindeer;}
    if(x==="rooster"){var y=rooster;}
    if(x==="scorpion"){var y=scorpion;}
    if(x==="sea star"){var y=seastar;}
    if(x==="shark"){var y=shark;}
    if(x==="sheep"){var y=sheep;}
    if(x==="snake"){var y=snake;}
    if(x==="spider"){var y=spider;}
    if(x==="stingray"){var y=stingray;}
    if(x==="tasmanian devil"){var y=tasmaniandevil;}
    if(x==="toucan"){var y=toucan;}
    if(x==="turtle"){var y=turtle;}
    if(x==="wolf"){var y=wolf;}
    if(x==="zebra"){var y=zebra;}


    //-----------------------------------------------------------------------
   
    
    const handleClick=()=>
    {
        props.setavatar(props.name);
    }
    return(
        <div className="Avatar" onClick={handleClick}>
            <img src={y}/>
         </div>
    )
    
}
export default Avatar;