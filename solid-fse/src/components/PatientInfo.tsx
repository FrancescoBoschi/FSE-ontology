import { Component, createMemo } from "solid-js"
import { PatientDetails } from "../models/Patient"

const PatientInfo: Component<{ patient: PatientDetails }> = (props) => {
  const avatarLetters = createMemo(
    () => `${props.patient.name[0]}${props.patient.surname[0]}`.toUpperCase()
  )

  return (
    <div class="flex flex-col">
      <div class="
        avatar bg-blue-400
        w-full aspect-h-1 aspect-w-1 rounded-full
      ">
        <span class="
          text-8xl text-gray-700 font-light flex justify-center items-center
        ">{avatarLetters()}</span>
      </div>
      <div class="info mt-6 text-center">
        <p class="text-lg mb-1">{props.patient.name} {props.patient.surname}</p>
        <p class="text text-gray-400">Maschio</p>
      </div>

      <div class="divider my-6"></div>

      <div class="mb-4">
        <p class="uppercase font-bold text-xs text-gray-400 mb-1">Data di nascita</p>
        <p>{props.patient.birthDate}</p>
      </div>
      <div class="mb-4">
        <p class="uppercase font-bold text-xs text-gray-400 mb-1">Medico di famiglia</p>
        <p>{props.patient.familyDoctor}</p>
      </div>
      <div class="mb-4">
        <p class="uppercase font-bold text-xs text-gray-400 mb-1">Codice fiscale</p>
        <p>{props.patient.fiscalCode}</p>
      </div>
      <div class="mb-4">
        <p class="uppercase font-bold text-xs text-gray-400 mb-1">Tessera sanitaria</p>
        <p>{props.patient.healthCardNumber}</p>
      </div>

    </div>
  )
}

export default PatientInfo