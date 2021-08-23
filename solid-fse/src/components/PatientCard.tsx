import { Component, createMemo } from "solid-js"
import { Link } from "solid-app-router"
import { Patient } from "../models/Patient"

interface Props { patient: Patient }

const PatientCard: Component<Props> = (props) => {
  const avatarLetter = createMemo(() => props.patient.name[0].toUpperCase())

  return (
    <Link href={`/patients/${props.patient.name}`} class="no-underline flex items-center gap-6 rounded-full hover:bg-gray-700">
      <div class="
        avatar
        w-12 h-12 rounded-full
        flex justify-center items-center
        bg-blue-400 text-gray-700
        text-lg font-semibold
      ">{avatarLetter}</div>
      <div class="info flex-grow">
        <p>{props.patient.name}</p>
        <p class="text-sm text-gray-400">Maschio</p>
      </div>
      <p class="birth text-gray-400 mr-4">01/01/2000</p>
    </Link>
  )
}

export default PatientCard