export default function Check({activo, inactivo}){
    return(
        <>
            <div className="form-check form-check-inline">
                <input className="form-check-input" checked={activo} type="radio" id="radioActive"/>
                <label className="form-check-label" for="inlineCheckbox1">Activo</label>
            </div>
            <div class="form-check form-check-inline">
                <input className="form-check-input" checked={inactivo} type="radio" id="radioInactive" value="option2"/>
                <label className="form-check-label" for="inlineCheckbox2">Inactivo</label>
            </div>
        </>
    )
}