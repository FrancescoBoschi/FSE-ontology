import { Component, createMemo } from "solid-js"
import { Patient } from "../models/Patient"

interface Props { patient: Patient }

const PatientInfo: Component<Props> = (props) => {
  const avatarLetter = createMemo(() => props.patient.name[0].toUpperCase())

  return (
    <div class="flex flex-col">
      <div class="
        avatar bg-blue-400
        w-full aspect-h-1 aspect-w-1 rounded-full
      ">
        <span class="
          absolute top-0 right-0 bottom-0 left-0
          flex justify-center items-center
          text-9xl text-gray-700 font-light
        ">{avatarLetter}</span>
      </div>
      <div class="info mt-6 text-center">
        <p>{props.patient.name}</p>
        <p class="text-sm text-gray-400">Maschio</p>
      </div>
    </div>
  )
}

export default PatientInfo