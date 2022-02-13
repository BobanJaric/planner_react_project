const handlers= (props)=>{

    let hendlerOrigin = '';

    if (props.originIcao1 && !props.originIcao2 && !props.originIcao3 && props.originIcao1 !== props.destinationIcao1) {
      hendlerOrigin =
        <div className="handlers-info">
          <p style={{textTransform:"lowercase"}}><span>{props.originIcao1}:{props.hendlerOrigin.split(",")[0]}</span>, {props.hendlerOrigin.split(",")[1]}, {props.hendlerOrigin.split(",")[2]}</p>
          <p style={{textTransform:"lowercase"}}><span>{props.destinationIcao1}:{props.hendlerDestination1.split(",")[0]}</span>, {props.hendlerDestination1.split(",")[1]}, { props.hendlerDestination1.split(",")[2] }</p>
        </div>
    } else if (props.originIcao1 && props.originIcao1 === props.destinationIcao1 && !props.originIcao2 && !props.originIcao3) {
      hendlerOrigin =
        <div className="handlers-info">
          <p style={{textTransform:"lowercase"}}><span>{props.destinationIcao1}:{props.hendlerDestination1.split(",")[0]}</span>,  {props.hendlerDestination1.split(",")[1]}, { props.hendlerDestination1.split(",")[2] }</p>
        </div>
    } else if (props.originIcao1 && props.originIcao2 && props.originIcao1 === props.destinationIcao2) {
      hendlerOrigin =
        <div className="handlers-info">
          <p style={{textTransform:"lowercase"}}><span>{props.originIcao1}:{props.hendlerOrigin.split(",")[0]}</span>, {props.hendlerOrigin.split(",")[1]}, {props.hendlerOrigin.split(",")[2]}</p>
          <p style={{textTransform:"lowercase"}}><span>{props.destinationIcao1}:{props.hendlerDestination1.split(",")[0]}</span>, {props.hendlerDestination1.split(",")[1]}, { props.hendlerDestination1.split(",")[2] }</p>
        </div>
    }
    else if (!props.originIcao1 && props.originIcao2 && !props.originIcao3) {
      hendlerOrigin =
        <div className="handlers-info">
          <p style={{textTransform:"lowercase"}}><span>{props.originIcao2}:{props.hendlerOrigin1.split(",")[0]}</span>, {props.hendlerOrigin1.split("")[1]}, {props.hendlerOrigin1.split("")[2]}</p>
          <p style={{textTransform:"lowercase"}}><span>{props.destinationIcao2}:{props.hendlerDestination2.split(",")[0]}</span>, {props.hendlerDestination2.split(",")[1]}, {props.hendlerDestination2.split(",")[2]}</p>
        </div>
    } else if (props.originIcao1 && props.originIcao2 && !props.originIcao3) {
      hendlerOrigin =
        <div className="handlers-info">
          <p style={{textTransform:"lowercase"}}><span>{props.originIcao1}:{props.hendlerOrigin.split(",")[0]}</span>, {props.hendlerOrigin.split(",")[1]}, {props.hendlerOrigin.split(",")[2]}</p>
          <p style={{textTransform:"lowercase"}}><span>{props.destinationIcao1}:{props.hendlerDestination1.split(",")[0]}</span>, {props.hendlerDestination1.split(",")[1]}, { props.hendlerDestination1.split(",")[2] }</p>
          <p style={{textTransform:"lowercase"}}><span>{props.destinationIcao2}:{props.hendlerDestination2.split(",")[0]}</span>, {props.hendlerDestination2.split(",")[1]}, {props.hendlerDestination2.split(",")[2]}</p>
        </div>
    } else if (props.originIcao1 && props.originIcao2 && props.originIcao3 && props.destinationIcao3 === props.originIcao1) {
      hendlerOrigin =
        <div className="handlers-info">
          <p style={{textTransform:"lowercase"}}><span>{props.originIcao1}:{props.hendlerOrigin.split(",")[0]}</span>, {props.hendlerOrigin.split(",")[1]}, {props.hendlerOrigin.split(",")[2]}</p>
          <p style={{textTransform:"lowercase"}}><span>{props.destinationIcao1}:{props.hendlerDestination1.split(",")[0]}</span>, {props.hendlerDestination1.split(",")[1]}, { props.hendlerDestination1.split(",")[2] }</p>
          <p style={{textTransform:"lowercase"}}><span>{props.destinationIcao2}:{props.hendlerDestination2.split(",")[0]}</span>, {props.hendlerDestination2.split(",")[1]}, {props.hendlerDestination2.split(",")[2]}</p>
        </div>
    } else if (props.originIcao1 && props.originIcao2 && props.originIcao3 && props.destinationIcao3 !== props.originIcao1) {
      hendlerOrigin =
        <div className="handlers-info">
          <p style={{textTransform:"lowercase"}} ><span>{props.originIcao1}:{props.hendlerOrigin.split(",")[0]}</span>, {props.hendlerOrigin.split(",")[1]}, {props.hendlerOrigin.split(",")[2]}</p>
          <p style={{textTransform:"lowercase"}}><span>{props.destinationIcao1}:{props.hendlerDestination1.split(",")[0]}</span>, {props.hendlerDestination1.split(",")[1]}, { props.hendlerDestination1.split(",")[2] }</p>
          <p style={{textTransform:"lowercase"}} ><span>{props.destinationIcao2}:{props.hendlerDestination2.split(",")[0]}</span>, {props.hendlerDestination2.split(",")[1]}, {props.hendlerDestination2.split(",")[2]}</p>
          <p style={{textTransform:"lowercase"}} ><span>{props.destinationIcao3}:{props.hendlerDestination3.split(",")[0]}</span>, {props.hendlerDestination3.split(",")[1]}, {props.hendlerDestination3.split(",")[2]}</p>
        </div>
  
    } else if (!props.originIcao1 && props.originIcao2 && !props.originIcao3) {
      hendlerOrigin =
        <div className="handlers-info">
          <p style={{textTransform:"lowercase"}} ><span>{props.originIcao2}:{props.hendlerOrigin1.split(",")[0]}</span>, {props.hendlerOrigin1.split(",")[1]}, {props.hendlerOrigin1.split(",")[2]}</p>
          <p style={{textTransform:"lowercase"}} ><span>{props.destinationIcao2}:{props.hendlerDestination2.split(",")[0]}</span>, {props.hendlerDestination2.split(",")[1]}, {props.hendlerDestination2.split(",")[2]}</p>
  
        </div>
    } else if (!props.originIcao1 && props.originIcao2 && props.originIcao3) {
      hendlerOrigin =
        <div className="handlers-info">
          <p style={{textTransform:"lowercase"}}><span>{props.originIcao2}:{props.hendlerOrigin1.split(",")[0]}</span>, {props.hendlerOrigin1.split(",")[1]}, {props.hendlerOrigin1.split(",")[2]}</p>
          <p style={{textTransform:"lowercase"}}><span>{props.destinationIcao2}:{props.hendlerDestination2.split(",")[0]}</span>, {props.hendlerDestination2.split(",")[1]}, {props.hendlerDestination2.split(",")[2]}</p>
          <p style={{textTransform:"lowercase"}}><span>{props.destinationIcao3}:{props.hendlerDestination3.split(",")[0]}</span>, {props.hendlerDestination3.split(",")[1]}, {props.hendlerDestination3.split(",")[2]}</p>
        </div>
    }
    return hendlerOrigin;
}

export default handlers;