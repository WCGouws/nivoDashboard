import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function NotifyPopup({ handleClose, popupConfig }) {
  const [showEntireRecord, setShowEntireRecord] = useState(false)

  const handleSendNotification = () => {
    window.alert("Add some functionality my dude")
    // /api/v1/email
    // payload (patron id?)
    // notification type? - expiring/lost/etc?

    let payload = {
      recordData: popupConfig.data, // payload
      notificationType: popupConfig.type
    }
  }

  return (
    <>
      {popupConfig.data &&
        <div>
          <Dialog
            open={popupConfig.show}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Send Notification?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Send a notification to {popupConfig.data["VAL_NAM_FIRST"]} {popupConfig.data["VAL_NAM_LAST"]} about their {popupConfig.type}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{justifyContent: "flex-start", width: "50%"}}>Cancel</Button>
              <Button variant='link' className='pt-0 m-0' onClick={() => setShowEntireRecord(!showEntireRecord)}>{showEntireRecord ? "Close" : "View"} record</Button>
              <Button onClick={handleSendNotification} autoFocus>
                Send
              </Button>
            </DialogActions>
            {showEntireRecord &&
              <div className="entire-record">
                {Object.keys(popupConfig.data).map((key, i) => (
                  <div>
                    <span className='left'><strong>{key}:</strong></span>
                    <span className='right'>{popupConfig.data[key]}</span>
                    <br></br>
                  </div>
                ))}
              </div>
            }
          </Dialog>

        </div>
      }
    </>
  );
}