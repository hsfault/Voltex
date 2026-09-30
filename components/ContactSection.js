"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONTACT_INFO, TOPICS } from "@/data/contact";

const EASE_OUT = [0.16, 1, 0.3, 1];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_MESSAGE = 800;
const EMPTY = { name: "", email: "", order: "", message: "" };
const FIELD_ORDER = ["name", "email", "order", "message"];
const ERROR_COLOR = "#ff6b7a";
const CHAMFER =
  "[clip-path:polygon(0_0,calc(100%_-_24px)_0,100%_24px,100%_100%,0_100%)]";

const fieldCls = (hasError) =>
  `w-full border-2 bg-steel px-4 font-mono text-sm text-bone outline-none transition-colors placeholder:text-bone/30 focus:border-glow ${
    hasError ? "border-[#ff6b7a]" : "border-bone/15"
  }`;

function validate(values, topic) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Tell us your name.";
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter a valid email so we can reply.";
  if (topic === "order" && !values.order.trim()) errors.order = "Add your order number (it starts with VX).";
  if (values.message.trim().length < 20) errors.message = "Give us a little more detail (20+ characters).";
  return errors;
}

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="label-mono text-bone/60">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      <p
        id={`${id}-msg`}
        className="mt-2 min-h-4 text-xs"
        style={{ color: error ? ERROR_COLOR : "rgb(238 242 247 / 0.4)" }}
      >
        {error || hint || ""}
      </p>
    </div>
  );
}

export default function ContactSection({ initialTopic = "other" }) {
  const uid = useId();
  const [topic, setTopic] = useState(initialTopic);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done
  const [ticket, setTicket] = useState("");

  const fid = (name) => `${uid}-${name}`;

  const set = (name) => (e) => {
    const value = name === "message" ? e.target.value.slice(0, MAX_MESSAGE) : e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values, topic);
    setErrors(found);
    const first = FIELD_ORDER.find((key) => found[key]);
    if (first) {
      document.getElementById(fid(first))?.focus();
      return;
    }
    setStatus("sending");
    // Demo only: simulate sending, then show a ticket number
    setTimeout(() => {
      setTicket(`VX-${Math.floor(10000 + Math.random() * 90000)}`);
      setStatus("done");
    }, 1000);
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setStatus("idle");
    setTicket("");
  };

  return (
    <section aria-label="Contact" className="bg-ink px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        {/* Info */}
        <aside>
          <p className="label-mono text-glow">Reach the pit crew</p>
          <ul className="mt-6 divide-y divide-bone/10 border-y border-bone/10">
            {CONTACT_INFO.map((item) => (
              <li key={item.label} className="py-6">
                <p className="label-mono text-bone/40">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-kinetic mt-2 inline-flex min-h-11 items-center text-[length:clamp(1.5rem,3vw,2rem)] text-bone transition-colors hover:text-glow"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-kinetic mt-2 text-[length:clamp(1.5rem,3vw,2rem)] text-bone">
                    {item.value}
                  </p>
                )}
                <p className="mt-1 text-sm text-bone/50">{item.note}</p>
              </li>
            ))}
          </ul>
        </aside>

        {/* Form card */}
        <div className={`border border-bone/10 bg-steel/40 p-5 sm:p-8 ${CHAMFER}`}>
          <AnimatePresence mode="wait" initial={false}>
            {status === "done" ? (
              <motion.div
                key="done"
                role="status"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="py-6"
              >
                <div className="grid h-16 w-16 -skew-x-12 place-items-center bg-glow shadow-[0_0_30px_var(--color-glow)]">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-8 w-8 skew-x-12 text-bone"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <p className="text-kinetic mt-6 text-[length:clamp(2.75rem,6vw,4.5rem)] text-bone">
                  Message received
                </p>
                <p className="mt-4 max-w-md text-bone/70">
                  Thanks, {values.name.trim().split(" ")[0]}. Someone from the
                  pit crew will reply to{" "}
                  <span className="text-bone">{values.email.trim()}</span> within
                  24 hours.
                </p>
                <div className="mt-6 inline-flex items-center gap-3 border border-bone/15 px-4 py-3">
                  <span className="label-mono text-bone/50">Ticket</span>
                  <span className="font-mono text-lg text-glow">{ticket}</span>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="label-mono mt-8 block min-h-11 text-bone/70 underline underline-offset-4 hover:text-bone"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id={fid("name")} label="Name" error={errors.name}>
                    <input
                      id={fid("name")}
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={set("name")}
                      placeholder="Your name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={`${fid("name")}-msg`}
                      className={`h-14 ${fieldCls(errors.name)}`}
                    />
                  </Field>
                  <Field id={fid("email")} label="Email" error={errors.email}>
                    <input
                      id={fid("email")}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={set("email")}
                      placeholder="you@ridemail.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={`${fid("email")}-msg`}
                      className={`h-14 ${fieldCls(errors.email)}`}
                    />
                  </Field>
                </div>

                {/* Topic chips (native radios, styled) */}
                <fieldset>
                  <legend className="label-mono text-bone/60">Topic</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {TOPICS.map((t) => (
                      <label
                        key={t.id}
                        className="relative flex h-11 -skew-x-12 cursor-pointer items-center border border-bone/20 px-4 text-bone/70 transition-colors hover:border-bone/50 has-checked:border-brand-500 has-checked:bg-brand-500 has-checked:text-bone has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-glow"
                      >
                        <input
                          type="radio"
                          name={`${uid}-topic`}
                          value={t.id}
                          checked={topic === t.id}
                          onChange={() => setTopic(t.id)}
                          className="sr-only"
                        />
                        <span className="label-mono inline-block skew-x-12">{t.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Order number, only for Order topic */}
                <AnimatePresence initial={false}>
                  {topic === "order" && (
                    <motion.div
                      key="order"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2">
                        <Field
                          id={fid("order")}
                          label="Order number"
                          error={errors.order}
                          hint="Find it in your confirmation email, e.g. VX-20417"
                        >
                          <input
                            id={fid("order")}
                            type="text"
                            value={values.order}
                            onChange={set("order")}
                            placeholder="VX-00000"
                            aria-invalid={Boolean(errors.order)}
                            aria-describedby={`${fid("order")}-msg`}
                            className={`h-14 uppercase ${fieldCls(errors.order)}`}
                          />
                        </Field>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Field
                  id={fid("message")}
                  label="Message"
                  error={errors.message}
                  hint={`${values.message.length}/${MAX_MESSAGE}`}
                >
                  <textarea
                    id={fid("message")}
                    rows={6}
                    value={values.message}
                    onChange={set("message")}
                    placeholder={
                      topic === "crew"
                        ? "What do you ride, where, and how much?"
                        : "How can we help?"
                    }
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={`${fid("message")}-msg`}
                    className={`resize-y py-4 ${fieldCls(errors.message)}`}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex h-14 w-full -skew-x-6 items-center justify-center bg-bone px-10 text-ink transition-colors hover:bg-glow hover:text-bone disabled:opacity-70 sm:w-auto"
                >
                  <span className="text-kinetic skew-x-6 text-2xl">
                    {status === "sending" ? "Sending…" : "Send message →"}
                  </span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}