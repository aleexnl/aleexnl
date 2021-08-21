import React from "react";
// Frameworks
import {
    Typography,
    Paper,
    Divider,
    TextField,
    InputAdornment,
    IconButton,
    Box,
    Snackbar,
    Alert,
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
import Head from "next/head";
import { useRouter } from "next/router";
import { makeApiRequest } from "lib/helpers";

export default function Contact() {
    const router = useRouter();
    const [name, setName] = React.useState("");
    const [nameError, setNameError] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [messageError, setMessageError] = React.useState(false);
    const [sendStatus, setSendStatus] = React.useState("success");
    const [open, setOpen] = React.useState(false); // Snackbar status
    React.useEffect(() => {
        name ? setNameError(false) : setNameError(true);
        email ? setEmailError(false) : setEmailError(true);
        message ? setMessageError(false) : setMessageError(true);
    }, [email, message, name]);
    React.useEffect(() => {
        setMessageError(false);
        setEmailError(false);
        setNameError(false);
    }, []);
    const [sending, setSending] = React.useState(false);
    const handleSend = async () => {
        setSending(true);
        const body = { name: name, email: email, message: message };
        const response = await makeApiRequest(
            "contacts",
            "POST",
            JSON.stringify(body)
        );
        setOpen(true);
        setSending(false);
        if (!response.ok) {
            return setSendStatus("error");
        }
        setSendStatus("success");
    };
    const handleClose = () => setOpen(false);
    return (
        <>
            <Head>
                <title>How to contact Aleexnl</title>
                <meta
                    name="description"
                    content="Need a Web Developer? Don not doubt to contact aleexnl."
                />
                <link
                    rel="canonical"
                    href="https://aleexnl.vercel.app/contact"
                />

                {/* OpenGraph Tags */}
                <meta property="og:title" content="How to contact Aleexnl" />
                <meta
                    property="og:url"
                    content="https://aleexnl.vercel.app/contact"
                />
                <meta
                    property="og:image"
                    content="https://aleexnl.vercel.app/logo.png"
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:description"
                    content="You can get in touch with me in a eas way, via social media or filling a simple contact form."
                />
                <meta property="og:locale" content={router.locale} />
            </Head>
            <Typography variant="h2" component="h1">
                Contact
            </Typography>
            <Divider sx={{ my: 0.5 }} />
            <Typography gutterBottom variant="body1">
                Need a hand? Or a high five?
            </Typography>
            <Box pt={2}>
                <Typography variant="body1" gutterBottom>
                    You can <strong>find me</strong> on{" "}
                    <strong>social media!</strong>
                </Typography>
                <Paper
                    elevation={1}
                    sx={{
                        p: 2,
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
            </Box>
            <Box py={2}>
                <Typography component="h2" gutterBottom>
                    Or you can <strong>contact me</strong> with this{" "}
                    <strong>form</strong>:
                </Typography>
                <Paper
                    elevation={1}
                    sx={{ display: "flex", flexDirection: "column", p: 2 }}
                    component="form"
                >
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
                    >
                        {sending ? "Sending..." : "Send"}
                    </LoadingButton>
                </Paper>
                <Snackbar
                    autoHideDuration={5000}
                    open={open}
                    onClose={handleClose}
                >
                    <Alert severity={sendStatus}>
                        {sendStatus == "error" &&
                            "Ops! There was an error sending your request! Please, try again later."}
                        {sendStatus == "success" &&
                            "Your request was sended succesfuly, I'll get in touch with you "}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}
