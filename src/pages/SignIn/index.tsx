import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/auth";
import { Log } from "../../models/Log";
import { Container,Help, Form, Header, Footer, Divider, Title, Label, Input,StatusConnection, StatusCircle, StatusText, Subtitle, Description   } from "./styles";

import { v4 as uuidv4 } from 'uuid';
import api from "../../services/api";


export function SignInPage() {
  const { user, signIn, signOut} = useAuth();

  // eslint-disable-next-line no-undef
  const [intervalLog, setIntervalLog] = useState<NodeJS.Timer | null>(null);
  // eslint-disable-next-line no-undef
  const [intervalSync, setIntervalSync] = useState<NodeJS.Timer | null>(null);

  const [inputConnection, setInputConnection] = useState('');
 

  useEffect(() => {
    if(user != null) {
      recLog();
      syncLogs();
    } else {
      if (intervalLog != null) clearInterval(intervalLog);
      if (intervalSync != null) clearInterval(intervalSync);

      setIntervalLog(null);
      setIntervalSync(null);
    }  
  }, [user]);


  async function recLog() {
    if(intervalLog != null) return;

    let lastSaveDBTime = 0;
    let log = new Log();

   const interval = setInterval(async () => {
      const idleTime: number = await window.Main.getSystemIdleTime(); // Seconds idle

        if (idleTime < lastSaveDBTime) {
            lastSaveDBTime = 0;
            log!.end = Date.now();
            console.log('Voltou da inatividade.', Date.now());

            log.id =  uuidv4();

            const logsString = window.sessionStorage.getItem('logs');
            const logs = logsString ? JSON.parse(logsString) as Log[] : [];
            logs.push(log);
            window.sessionStorage.setItem('logs', JSON.stringify(logs));

            console.log(logs);
              
            console.log('Salvou no banco o log', log);
            log = new Log();
        }

        console.log(idleTime);
  
        if (idleTime > 10 && log.start == null) {
            lastSaveDBTime = idleTime;
            log!.start = Date.now();
            console.log('Inicio da inatividade', Date.now())
        }

    }, 1000);
   
    setIntervalLog(interval);
  }


  async function syncLogs() {
   const interval = setInterval(() => {
      const logsString = window.sessionStorage.getItem('logs');
      const logs = logsString ? JSON.parse(logsString) as Log[] : [];
      const idsLogs = logs.map((log) => log.id);

      if (logs.length === 0) return null;

      api.post('logs/push', {logs})
      .then(() => {
        const logsString = window.sessionStorage.getItem('logs');
        const logs = logsString ? JSON.parse(logsString) as Log[] : [];

        const apenasLogsAindaNaoSync = logs.filter((log) => !idsLogs.includes(log.id))
        window.sessionStorage.setItem('logs', JSON.stringify(apenasLogsAindaNaoSync));
      })
      .catch((data) => {
        console.log(data);
      })
    }, 5000);

    setIntervalSync(interval);
  } 
  
    function handleSignIn() {
      if(user != null) {
        signOut();
      } else {
        console.log(inputConnection);
        signIn(inputConnection);
       
      }
     
    }

  

    return (
      <Container>

        <Header>
          <Title>LW</Title>
          <Divider />
        </Header>
       

        <Form>
          <Label>Código conexão</Label>
          <Input onChange={(e) => setInputConnection(e.target.value)} value={inputConnection}/>
        </Form>
   
        
        <Help>
          <Subtitle>Ei, que código é esse?</Subtitle>
          <Description>Esse código é unico de cada plataforma, solicite ao administrador. O código é utilizado para envio dos logs coletados nesta maquina para a plataforma em nuvem.</Description>
        </Help>

        <Footer>
          <StatusConnection>
            <StatusCircle connected={user != null} />
            <StatusText>{user != null ? 'Conexão estabelecida' : 'Aguardando conexão'}</StatusText>
          </StatusConnection>
       
          <Button onClick={() => handleSignIn()}>{user != null ? 'Desconectar' : 'Conectar'}</Button>
        </Footer>
        
 

      
  
      </Container>
    )
  }
   