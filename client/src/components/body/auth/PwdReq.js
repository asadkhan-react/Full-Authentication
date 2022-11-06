import React , {useState} from 'react'

function PwdReq ({captialFlag , numberFlag , lengthFlag , speciaCharFlag , captialFlagBoolean , numberFlagBoolean , lengthFlagBoolean , speciaCharFlagBoolean}) {
    console.log(captialFlagBoolean)
    return(
        <>
        <p className={captialFlag}>{captialFlagBoolean ? <i class="fa fa-check-square-o"></i> : <i class="fa fa-times"></i>}Password must have One Capital Letter</p>
        <p className={numberFlag}>{numberFlagBoolean ? <i class="fa fa-check-square-o"></i> : <i class="fa fa-times"></i>}Password must have one Numeric Letter</p>
        <p className={lengthFlag}>{lengthFlagBoolean ? <i class="fa fa-check-square-o"></i> : <i class="fa fa-times"></i>}Password must should be equal or greater than to 8 </p>
        <p className={speciaCharFlag}>{speciaCharFlagBoolean ? <i class="fa fa-check-square-o"></i> : <i class="fa fa-times"></i>}Password must have one special digit</p>
        </>
    )
}

export default PwdReq;