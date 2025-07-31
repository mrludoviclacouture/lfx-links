import styled from 'styled-components'
import { Container } from './reusable-styles'
import { NewUp, OvalIcon } from './icons'
import links from './links'

const WebLinks = () => {
  const avatarImage = '/avatar.png'
  const titleImage = null
  const name = 'Lit Flow X'
  const bio = 'Dreamy vibes X Luxury looks'

  const main = links.filter(el => {
    return el.type === 'main' && el.on
  })

  return (
    <LinkWrapper>
      <LinkContainer>
        <TopPart>
          <LinkHeader>
            <Avatar>
              <AvatarWrap>
                <OvalIcon />
                <img src={avatarImage} className='oval-clipped' />
              </AvatarWrap>
            </Avatar>
            <Title>
              {/* Using titleimg flag to use image as title or text */}
              {titleImage ? (
                <img src={titleImage} className='handle' />
              ) : (
                <h1>{name}</h1>
              )}
              {/* if your remove username from data it will not appear */}
              {/* {username ? (
                <h3>
                  <a href={`${url}`}>{username}</a>
                </h3>
              ) : (
                ''
              )} */}
            </Title>
          </LinkHeader>

          {/* Bio Section */}
          <LinkBio>{bio && <h1>{bio} </h1>}</LinkBio>
          {/* End Bio Section */}

          {/* Weblinks started */}
          <WebLinkWrap>
            {/* Main Section */}
            {main.length > 0 ? (
              <LinkSection>
                {/* <h3>{main[0].type}</h3> */}
                {main.map(i => {
                  return (
                    <a
                      href={i.url}
                      key={i.title}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <LinkBox>
                        <LinkTitle>
                          <img src={i.icon} style={{ filter: 'var(--img)' }} />{' '}
                          {i.title}
                        </LinkTitle>{' '}
                        <NewUp />
                      </LinkBox>
                    </a>
                  )
                })}
              </LinkSection>
            ) : (
              ''
            )}
            {/* End Main Section */}
          </WebLinkWrap>
          {/* End Weblinks */}
        </TopPart>
      </LinkContainer>
    </LinkWrapper>
  )
}

export default WebLinks

const LinkWrapper = styled(Container)``
const LinkContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 24px;
`
const LinkHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 12px;
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    margin-top: 20px;
  }
`
const Avatar = styled.div`
  height: 90px;
  width: 90px;
  position: relative;
  margin-bottom: 12px;
`
const AvatarWrap = styled.div`
  height: 100%;
  width: 100%;
  filter: drop-shadow(0px 1px 2px var(--avatar-shadow));
  img {
    height: calc(100% - 6px);
    width: calc(100% - 6px);
  }
  .avatar-border {
    height: 100%;
    width: 100%;
    position: absolute;
    background: ${({ theme }) => theme.bg.primary};
  }
  .avatar-fill {
    height: calc(100% - 6px);
    width: calc(100% - 6px);
    position: absolute;
    background: ${({ theme }) => theme.bg.primary};
  }
`
const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 38px;
    font-weight: 700;
    letter-spacing: -2px;
    // background: linear-gradient(
    //   90deg,
    //   #4ab1f1 5.71%,
    //   #566cec 33.77%,
    //   #d749af 61.82%,
    //   #ff7c51 91.21%
    // );
    -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    background-clip: text;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      font-size: 32px;
    }
  }
  h3 {
    margin-top: 6px;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -0.7px;
    color: ${({ theme }) => theme.text.secondary};
    opacity: 0.5;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      font-size: 15px;
      margin-top: 2px;
    }
  }

  .name {
    margin-top: 8px;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      width: 140px;
    }
  }
  .handle {
    height: 32px;
    margin-top: 6px;
    margin-bottom: 6px;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      height: 26px;
    }
  }
`
const LinkBio = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 22px;
    line-height: 30px;
    font-weight: 500;
    letter-spacing: -0.6px;
    padding: 0 20px;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      font-size: 18px;
      line-height: 26px;
      padding: 0 8px;
    }
    vertical-align: middle;
    span {
      font-size: 12px;
      vertical-align: bottom;
      line-height: 30px;
      color: ${({ theme }) => theme.text.secondary};
      margin: 0 2px;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        font-size: 10px;
        line-height: 20px;
      }
    }
  }
  h4 {
    font-size: 18px;
    letter-spacing: -0.5px;
    margin: 10px 0;
    color: ${({ theme }) => theme.text.secondary};
    font-weight: 500;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      font-size: 15px;
      padding: 0 20px;
      line-height: 24px;
    }
    a {
      font-weight: 700;
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
  }
`
const TopPart = styled.div``
const WebLinkWrap = styled.div`
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    padding: 0 12px;
  }
`
const LinkSection = styled.div`
  padding: 12px 0;
  display: flex;
  margin: 0 auto;
  max-width: 400px;
  flex-direction: column;
  &.social {
    max-width: max-content;
    padding: 0;
    margin-bottom: 18px;
  }
  .iconsonly {
    display: flex;
    justify-content: center;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      flex-wrap: wrap;
    }
  }
  h3 {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 4px;
    margin-bottom: 4px;
    color: ${({ theme }) => theme.text.secondary};
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      font-size: 11px;
    }
  }
`
const LinkBox = styled.div`
  padding: 18px 20px;
  border-radius: 12px;
  margin: 8px 18px;
  border: 1px solid ${({ theme }) => theme.bg.secondary};
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.5px;
  position: relative;
  text-align: center;

  &::before {
    content: '';
    border-radius: 12px;
    display: block;
    position: absolute;
    z-index: -1;
    inset: -2px;
    opacity: 0;
    transform: scale(0.8);
  }
  &:hover {
    transition: all 333ms ease 0s;
    border-color: transparent;
    &::before {
      opacity: 1;
      background: ${({ theme }) => theme.bg.hover};
      transition: all 333ms ease 0s;
      transform: scale(1);
    }
  }
  .new-up {
    transform: scale(0.8);
    opacity: 0.7;
  }

  &.socialIcon {
    padding: 16px;
    border-radius: 50%;
    border: none;
    margin: 4px;
    img {
      height: 24px;
    }

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      padding: 10px;
      margin: 2px;
      img {
        height: 20px;
      }
    }
  }
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    padding: 12px 16px;
    font-size: 16px;
  }
`
const LinkTitle = styled.div`
  display: flex;
  font-size: 18px;
  align-items: center;
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    font-size: 14px;
  }
  img {
    height: 20px;
    margin-right: 10px;
  }
`