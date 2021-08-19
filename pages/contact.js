import React from "react";
// Frameworks
import {
    Typography,
    Paper,
    Divider,
    TextField,
    InputAdornment,
    IconButton,
} from "@material-ui/core";
import LoadingButton from "@material-ui/lab/LoadingButton";
// Assets
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import MessageIcon from "@material-ui/icons/Message";
import SendIcon from "@material-ui/icons/Send";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import "@fontsource/catamaran";
import Head from "next/head";

export default function Contact() {
    const [name, setName] = React.useState("");
    const [nameError, setNameError] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [messageError, setMessageError] = React.useState(false);
    React.useEffect(() => {
        name ? setNameError(false) : setNameError(true);
    }, [name]);
    React.useEffect(() => {
        email ? setEmailError(false) : setEmailError(true);
    }, [email]);
    React.useEffect(() => {
        message ? setMessageError(false) : setMessageError(true);
    }, [message]);
    React.useEffect(() => {
        setMessageError(false);
        setEmailError(false);
        setNameError(false);
    }, []);
    const [sending, setSending] = React.useState(false);
    const handleSend = () => {
        setSending(true);
        setTimeout(() => {
            console.log("sended");
            setSending(false);
        }, 3000);
    };
    return (
        <>
            <Head>
                <title>Contact</title>
                <meta
                    name="description"
                    content="Need a Web Developer? Don not doubt to contact aleexnl."
                />
            </Head>
            <Typography variant="h2" component="h1" fontFamily="Catamaran">
                Contact
            </Typography>
            <Divider sx={{ my: 0.5 }} />
            <Typography gutterBottom variant="body1">
                Need a hand? Or a high five?
            </Typography>
            <Paper
                elevation={1}
                sx={{ display: "flex", flexDirection: "column", my: 2, p: 2 }}
                component="form"
            >
                <Typography gutterBottom fontWeight={600} component="h2">
                    Contact me!
                </Typography>
                <TextField
                    id="contact-user-name"
                    type="text"
                    label="Name"
                    error={nameError}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    aria-required
                    placeholder="Jeff"
                    helperText="How am I going to call you"
                    margin="dense"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircleIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    id="contact-user-mail"
                    type="email"
                    label="E-mail"
                    error={emailError}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    aria-required
                    placeholder="therichest@somemail.com"
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="contact-user-message"
                    type="text"
                    label="Message"
                    required
                    value={message}
                    error={messageError}
                    onChange={(event) => setMessage(event.target.value)}
                    aria-required
                    multiline
                    maxRows={5}
                    placeholder="Brief message explaining your problem..."
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MessageIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <LoadingButton
                    startIcon={<SendIcon />}
                    disabled={!name || !email || !message}
                    sx={{ my: 1 }}
                    loading={sending}
                    loadingPosition="start"
                    onClick={handleSend}
                    type="submit"
                >
                    {sending ? "Sending..." : "Send"}
                </LoadingButton>
            </Paper>

            <Typography variant="body1" textAlign="center" gutterBottom>
                You can also <strong>find me</strong> in social media!
            </Typography>
            <Paper
                elevation={0}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <IconButton
                    aria-label="Instagram"
                    href="https://www.instagram.com/aleexnl/"
                    target="__blank"
                >
                    <InstagramIcon />
                </IconButton>
                <IconButton
                    aria-label="LinkedIn"
                    href="https://www.linkedin.com/in/alejandro-nieto-luque/"
                    target="__blank"
                >
                    <LinkedInIcon />
                </IconButton>
                <IconButton
                    aria-label="GitHub"
                    href="https://github.com/aleexnl"
                    target="__blank"
                >
                    <GitHubIcon />
                </IconButton>
                <IconButton
                    aria-label="E-Mail"
                    href="mailto:alex.nieto0027@gmail.com"
                    target="__blank"
                >
                    <AlternateEmailIcon />
                </IconButton>
                <IconButton
                    aria-label="WhatsApp"
                    href="sms:679365974"
                    target="__blank"
                >
                    <WhatsAppIcon />
                </IconButton>
            </Paper>
        </>
    );
}
