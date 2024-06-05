import { CardWrapper } from "@/components/global/cardWrapper"

export const SignInForm = () => {
    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/secure/sign-up"
            showSocial
        >
            Sign in form
        </CardWrapper>
    )
}