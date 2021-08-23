import { Component, createMemo, createSignal } from "solid-js"

const Register: Component = () => {

  const [name, setName] = createSignal("")
  const [surname, setSurname] = createSignal("")
  const [birthDate, setBirthDate] = createSignal("")

  const canSubmit = createMemo(() => name() != "" && surname() != "" && birthDate() != "")

  const onSubmit = (e: Event) => {
    e.preventDefault()
    console.log(`Register patient with:\nName ${name()}\nSurname ${surname()}\nBirth date ${birthDate()}`)
  }

  return (
    <form class="flex flex-col gap-6" onSubmit={onSubmit}>
      <div>
        <span class="block ml-2 mb-2">Nome</span>
        <input
          class="input w-full"
          type="text"
          placeholder="Mario"
          value={name()}
          onKeyUp={(e) => setName(e.currentTarget.value)}
        />
      </div>
      <div>
        <span class="block ml-2 mb-2">Cognome</span>
        <input
          class="input w-full"
          type="text"
          placeholder="Rossi"
          value={surname()}
          onKeyUp={(e) => setSurname(e.currentTarget.value)}
        />
      </div>
      <div>
        <span class="block ml-2 mb-2">Data di nascita</span>
        <input
          class="input w-full"
          type="text"
          placeholder="01/01/1990"
          value={birthDate()}
          onKeyUp={(e) => setBirthDate(e.currentTarget.value)}
        />
      </div>

      <button type="submit" class="btn mt-6 mx-auto px-20" disabled={!canSubmit()}>Registra utente</button>
    </form>
  )
}

export default Register