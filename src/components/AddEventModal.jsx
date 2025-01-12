import { Modal } from "./Modal";

export const AddEventModal = ({ open = false }) => {
  return (
    <Modal open={open} title="schedule service">
      <form className="flex flex-col gap-2">
        <label htmlFor="title" className="font-semibold text-slate-800">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="What you need?"
          required
          className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500"
        />
        <fieldset className="flex flex-col gap-2">
          <input
            type="text"
            disabled
            value="siuuuuuuu"
            className="text-center bg-white disabled:text-slate-500 font-semibold"
          />
          <legend className="text-xs text-slate-700">
            Date and time of service
          </legend>
          <section className="flex gap-2 *:flex-1">
            <section className="flex flex-col gap-1">
              <label
                htmlFor="start_hour"
                className="font-semibold text-slate-800"
              >
                Start hour
              </label>
              <select
                name="start_hour"
                id="start_hour"
                required
                className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500"
              >
                <option value="8">8hrs</option>
                <option value="9">9hrs</option>
                <option value="10">10hrs</option>
                <option value="11">11hrs</option>
                <option value="12">12hrs</option>
                <option value="13">13hrs</option>
                <option value="14">14hrs</option>
                <option value="15">15hrs</option>
                <option value="16">16hrs</option>
                <option value="17">17hrs</option>
                <option value="18">18hrs</option>
                <option value="19">19hrs</option>
              </select>
            </section>
            <section className="flex flex-col gap-1">
              <label
                htmlFor="end_hour"
                className="font-semibold text-slate-800"
              >
                End hour
              </label>
              <select
                name="end_hour"
                id="end_hour"
                required
                className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500"
              >
                <option value="8">8hrs</option>
                <option value="9">9hrs</option>
                <option value="10">10hrs</option>
                <option value="11">11hrs</option>
                <option value="12">12hrs</option>
                <option value="13">13hrs</option>
                <option value="14">14hrs</option>
                <option value="15">15hrs</option>
                <option value="16">16hrs</option>
                <option value="17">17hrs</option>
                <option value="18">18hrs</option>
                <option value="19">19hrs</option>
              </select>
            </section>
          </section>
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <legend className="text-xs text-slate-700">Service data</legend>
          <label
            htmlFor="phone_number"
            className="font-semibold text-slate-800"
          >
            Phone number
          </label>
          <input
            type="tel"
            name="phone_number"
            id="phone_number"
            placeholder="###"
            className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500"
          />
          <label htmlFor="direction" className="font-semibold text-slate-800">
            Address
          </label>
          <textarea
            name="direction"
            id="direction"
            placeholder="Where is the service?"
            required
            className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500"
          ></textarea>
        </fieldset>
        <label htmlFor="" className="font-semibold text-slate-800">
          Comments
        </label>
        <textarea
          name="commens"
          id="comments"
          placeholder="Any special instruction?"
          required
          className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500"
        ></textarea>
      </form>
    </Modal>
  );
};
