import React, { useState } from "react";
import axios from "axios";
import { ArrowRight } from "react-feather";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import cn from "classnames";
import {
    FormGroup,
    Label,
    Input,
    Textarea,
    ErrorText,
} from "@ui/form-elements";
import Button from "@ui/button";

const ContactForm = ({ className, url }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });
    const [serverState, setServerState] = useState({
        submitting: false,
        status: null,
    });
    const handleServerResponse = (ok, msg, form) => {
        setServerState({
            submitting: false,
            status: { ok, msg },
        });
        if (ok) {
            form.reset();
        }
    };
    const onSubmit = (data, e) => {
        const form = e.target;
        setServerState({ submitting: true });
        axios({
            method: "post",
            url: url,
            data,
        })
            .then((res) => {
                console.log();
                handleServerResponse(true, "Merci pour le message ! A bientôt", form);
            })
            .catch((err) => {
                handleServerResponse(false, err.response.data.error, form);
            });
    };

    return (
        <div className={cn("contact-form-wrapper", className)}>
            <div className="introduce">
                <form
                    className="rnt-contact-form rwt-dynamic-form row"
                    id="contact-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="col-lg-6">
                        <FormGroup>
                            <Label htmlFor="name">Ton nom</Label>
                            <Input
                                name="name"
                                id="name"
                                type="text"
                                {...register("name", {
                                    required: "Ton nom please",
                                })}
                            />
                            {errors.name && (
                                <ErrorText>{errors.name?.message} &#128512;</ErrorText>
                            )}
                        </FormGroup>
                    </div>

                    <div className="col-lg-6">
                        <FormGroup>
                            <Label htmlFor="phone">Ton numéro</Label>
                            <Input
                                name="phone"
                                id="phone"
                                type="text"
                                {...register("phone", {
                                    required: "Ton numéro please",
                                })}
                            />
                            {errors.phone && (
                                <ErrorText>{errors.phone?.message} &#128512;</ErrorText>
                            )}
                        </FormGroup>
                    </div>

                    <div className="col-lg-12">
                        <FormGroup>
                            <Label htmlFor="email">Ton email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Mets une addresse please",
                                    },
                                })}
                            />
                            {errors.email && (
                                <ErrorText>{errors.email?.message} &#128512;</ErrorText>
                            )}
                        </FormGroup>
                    </div>

                    <div className="col-lg-12">
                        <FormGroup>
                            <Label htmlFor="subject">Objet de ton message</Label>
                            <Input
                                id="subject"
                                name="subject"
                                type="text"
                                {...register("subject", {
                                    required: "Oh il te manque l'objet du message",
                                })}
                            />
                            {errors.subject && (
                                <ErrorText>{errors.subject?.message} &#128512;</ErrorText>
                            )}
                        </FormGroup>
                    </div>

                    <div className="col-lg-12">
                        <FormGroup>
                            <Label htmlFor="message">Et ton message</Label>
                            <Textarea
                                name="message"
                                id="message"
                                {...register("message", {
                                    required: "Un petit message ...",
                                })}
                            ></Textarea>
                            {errors.message && (
                                <ErrorText>{errors.message?.message} &#128512;</ErrorText>
                            )}
                        </FormGroup>
                    </div>

                    <div className="col-lg-12">
                        <Button type="submit">
                            <span>Envoyer &#128512;</span>
                            <ArrowRight />
                        </Button>
                        {serverState.status && (
                            <p
                                className={`mt-4 font-14 ${
                                    !serverState.status.ok
                                        ? "text-red"
                                        : "text-success"
                                }`}
                            >
                                {serverState.status.msg}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

ContactForm.propTypes = {
    className: PropTypes.string,
    url: PropTypes.string,
};

export default ContactForm;
